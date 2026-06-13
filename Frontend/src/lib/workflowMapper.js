

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

export const mapEdgesforBackend = (edges) =>{
    return edges.map((edge)=>({
        edgeId: edge.id || crypto.randomUUID(),

        source:
        nodes.find(
            (n) => n.id == edges.source 
        )?.data.nodeId,

        target:
        nodes.find(
            (n) => n.id == edges.target
        )?.data.nodeId,

        sourceHandler: edge.sourceHandler,
        targetHandler: edge.targetHandler,
        condition: edge.condition,

    }));
};

