


export const mapNodeforBackend = (nodes)=>{
    return nodes.map((node)=>({
        nodeId: node.data.nodeId,
        type: node.data.type,
        kind: node.data.kind,
        config: node.data.config,
        position: node.position,

        metadata: {
            name: node.data.label,
            version: 1
        },
        inputs: [],
        outputs: [],
    }));
};

export const mapEdgesforBackend = (edges, nodes) =>{
    return edges.map((edge)=>({
        edgeId: edge.id || crypto.randomUUID(),

        source:
        nodes.find(
            (n) => n.id == edge.source 
        )?.data.nodeId,

        target:
        nodes.find(
            (n) => n.id == edge.target
        )?.data.nodeId,

        sourceHandler: edge.sourceHandler,
        targetHandler: edge.targetHandler,
        condition: edge.condition,

    }));
};

export const deserializeFlow = (
  workflow
) => {
    const nodes = workflow.nodes.map(
    (node) => ({
      id: node.nodeId,

      type: node.kind,

      position: node.position,

      data: {
        nodeId: node.nodeId,
        label:
          node.metadata?.name ||
          node.kind,

        type: node.type,
        kind: node.kind,

        config:
          node.config || {}
      }
    })
  );

  const edges = workflow.edges.map(
    (edge) => ({
      id: edge.edgeId,

      source: edge.source,
      target: edge.target,

      sourceHandle:
        edge.sourceHandle,

      targetHandle:
        edge.targetHandle,

      condition:
        edge.condition
    })
  );

  return { nodes, edges };
};


