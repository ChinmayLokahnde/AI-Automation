const getNextNodes = (nodeId, edges, result) => {

  return edges
    .filter(e => {

      if (!e.condition) {
        return e.source === nodeId
      }
      return (
        e.source === nodeId &&
        e.condition === String(result)
      )
    })
    .map(e => e.target)
};

const getParentNodes = (nodeId, edges)=>{
    return edges .filter(e => e.target === nodeId) .map(e => e.source)

};

const getReadyNodes = (nodes, edges, completeNodes)=>{
    return nodes.filter(node=>{
        if(completeNodes.has(node.nodeId)) return false

        const parents = getParentNodes(node.nodeId, edges)

        if(parents.length == 0) return true

        return parents.every(p => completeNodes.has(p));
    })
}

module.exports = {
    getNextNodes,
    getParentNodes,
    getReadyNodes
}



