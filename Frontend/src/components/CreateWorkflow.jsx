import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import WebhookNode from '@/nodes/triggers/webhookNode';
import HttpNode from '@/nodes/action/HttpNode';
import IfNode from '@/nodes/conditions/IfNode';
import { Sidebar } from 'lucide-react';


const initialNodes = [
  { id: 'n1', type: "webhook", position: { x: 100, y: 100 }, data: { label: 'Webhook', type: "trigger", kind: "webhook", config: {},} },
];

const nodeTypes = {
  webhook: WebhookNode,
  http: HttpNode,
  if: IfNode

}

const initialEdges = [];
 
export default function CreateFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
 
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

   const addNode = (type, kind)=>{
    const newNode = {
      id: crypto.randomUUID(),
      type: kind,
      position: {x: Math.random() *400, y: Math.random() *400},
      data:{
         nodeId:crypto.randomUUID(),
         label:kind,
         type, 
         kind, 
         config:{},}
    };
    setNodes((nds)=> [...nds, newNode]);
  }
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Sidebar/>
      <TriggerSheet onSelect={addNode}/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls/>
      </ReactFlow>
    </div>
  );
}