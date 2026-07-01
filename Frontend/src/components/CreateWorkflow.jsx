import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WebhookNode from '@/nodes/triggers/webhookNode';
import HttpNode from '@/nodes/action/HttpNode';
import IfNode from '@/nodes/conditions/IfNode';
import EmailNode from "../nodes/action/EmailNode";
import OpenAiNode from "../nodes/action/OpenAiNode";
import ScheduleNode from "../nodes/triggers/ScheduleNode"
import { Sidebar } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { data, useNavigate, useParams } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import NodeConfig from './NodeConfig';
import Topbar from './Topbar';
import { mapNodeforBackend, mapEdgesforBackend, deserializeFlow} from '../lib/workflowMapper';
import { createWorkflow, getWorkflow } from '../lib/workflowApi';



const initialNodes = []

const nodeTypes = { 
  webhook: WebhookNode,
  http: HttpNode,
  if: IfNode,
  email: EmailNode,
  openAi: OpenAiNode,
  schedule: ScheduleNode
}

const initialEdges = [];
 
export default function CreateFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null)
  const [workflowName, setWorkflowName] = useState("");
  const {id} = useParams()
  const navigate = useNavigate()
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
  (changes) => {
    setEdges((edgesSnapshot) =>
      applyEdgeChanges(
        changes,
        edgesSnapshot
      )
    );
  },
  [setEdges]
);

  const onConnect = (params) => {

  const sourceNode = nodes.find(
    (n) => n.id === params.source
  );

  let condition = null;

  if (
    sourceNode?.data?.kind === "if"
  ) {
    condition = params.sourceHandle;
  }

  const newEdge = {
    id: crypto.randomUUID(),
    ...params,
    label: condition,
    condition,
  };

  setEdges((eds) => {

    const next = [
      ...eds,
      newEdge
    ];
    return next;
  });
};
  const isValidConnection = (connection) =>{
    // const sourceNode = nodes.find((n)=> n.id === connection.source);
    const targetNode = nodes.find((n)=> n.id === connection.target);

    if(targetNode?.data?.type == "trigger") return false;
    return true;
  };

   const addNode = (type, kind, position)=>{
    const newNode = {
      id: crypto.randomUUID(),
      type: kind,
      position,
      data:{
         nodeId:crypto.randomUUID(),
         label:kind,
         type, 
         kind, 
         config:{},}
    };
    setNodes((nds)=> [...nds, newNode]);
  }

  const {screenToFlowPosition} = useReactFlow();

  const onDragOver = (event) =>{
    event.preventDefault();;
    event.dataTransfer.dropEffect = "move"
  }
  const onDrop = (event)=>{
    
    event.preventDefault();;

    const data = event.dataTransfer.getData(
    "application/reactflow"
  );

    if(!data){
      return
    }

    const node = JSON.parse(data)

    const position = screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  });
        addNode(
          node.type,
          node.kind,
          position
        );
  };
  const handleSave = async()=>{

    if(!workflowName.trim){
      alert("enter workflow name")
      return
    }

    try{
      const payload = {
      name: workflowName,
      nodes: mapNodeforBackend(nodes),
      edges: mapEdgesforBackend(edges, nodes)
    }
    console.log(payload)

    const token = localStorage.getItem("token")

    const workflow = await createWorkflow(payload, token);

    console.log("workflow saved", workflow);

    navigate(`/workflow/${workflow._id}`);
    
    
    }catch(err){
      console.log(err)
      err.message
    }
    
  }
  const handleRun = async ()=>{
    console.log("run clicked")
    try{
      if(!id){
      console.log("no workflow id")
      return
      }
      console.log("workflow id", id)
    const response = await fetch(`http://localhost:5000/api/workflow/run/${id}`,
      {
        method: "POST"
      }
    );
    const data = await response.json();

    console.log("execution started", data)
    }catch(err){
      console.log(err)
    }
    
  }

  useEffect(()=>{
    if(!id) return;
    const loadWorkflow = async()=>{
      const workflow = await getWorkflow(id)


      
      const data = deserializeFlow(workflow);
      

      setNodes(data.nodes);
      setEdges(data.edges);

      setWorkflowName(workflow.name)
    };
    loadWorkflow();
  },[id])


  const updateNodeConfig = (nodeId, config) => {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              config,
            },
          }
        : node
    )
  );

  setSelectedNode((prev) => ({
    ...prev,
    data: {
      ...prev.data,
      config,
    },
  }));
};
 
  return (
    <div className='h-screen flex flex-col'>
      <Topbar
      workflowName={workflowName}
      setWorkflowName={setWorkflowName}
      onSave={handleSave}
      onRun={handleRun}
      />
      
      <div className='flex flex-1 overflow-hidden'>
        <AppSidebar/>

        <div className='flex-1 h-full'>
          
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(event, node) => {
        setSelectedNode(node);
           }}

        fitView
      >
        
        <Background />
        <Controls/>
      </ReactFlow>
      </div>
      <NodeConfig node={selectedNode} updateNodeConfig={updateNodeConfig}/>
      </div>
    </div>
  );
}