import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WebhookNode from '@/nodes/triggers/webhookNode';
import HttpNode from '@/nodes/action/HttpNode';
import IfNode from '@/nodes/conditions/IfNode';
import { Sidebar } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { data } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import NodeConfig from './NodeConfig';
import Topbar from './Topbar';
import { mapNodeforBackend, mapEdgesforBackend } from '../lib/workflowMapper';


const initialNodes = []

const nodeTypes = {
  webhook: WebhookNode,
  http: HttpNode,
  if: IfNode

}

const initialEdges = [];
 
export default function CreateFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null)
  const [workflowName, setWorkflowName] = useState("");
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges],
  );

  const onConnect = (params)=>{
    const sourceNode = nodes.find((n)=> n.id === params.source);

    let condition = null;

    if(sourceNode.data.kind == "if"){
      condition = params.sourceHandle
    };
    setEdges((eds)=>[...eds, {...params, label:condition, condition}]);
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
  const handleSave = ()=>{
    const payload = {
      name: workflowName,
      nodes: mapNodeforBackend(nodes),
      edges: mapEdgesforBackend(edges, nodes)
    };
    console.log(payload)
  }
  const handleRun = ()=>{
    console.log("run workflow")
  }
 
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
      <NodeConfig node={selectedNode} />
      </div>
    </div>
  );
}