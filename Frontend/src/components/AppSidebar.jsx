import { nodeRegistry } from "../lib/nodeRegistry";

export function AppSidebar() {

  const grouped = {};

  nodeRegistry.forEach((node) => {
    if (!grouped[node.category]) {
      grouped[node.category] = [];
    }

    grouped[node.category].push(node);
  });

  const onDragStart = (event, node) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(node)
    );

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 border-r bg-white p-4 overflow-y-auto">

      <h2 className="text-xl font-bold mb-4">
        Nodes
      </h2>

      <input
        placeholder="Search nodes..."
        className="w-full border rounded-md px-3 py-2 mb-4"
      />

      {Object.entries(grouped).map(
        ([category, nodes]) => (
          <div key={category} className="mb-6">

            <h3 className="font-semibold text-sm text-gray-500 mb-2">
              {category}
            </h3>

            <div className="space-y-2">

              {nodes.map((node) => {
                const Icon = node.icon;

                return (
                  <div
                    key={node.kind}
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, node)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      p-2
                      rounded-lg
                      border
                      cursor-grab
                      hover:bg-gray-100
                    "
                  >
                    <Icon size={18} />

                    <span>
                      {node.label}
                    </span>
                  </div>
                );
              })}

            </div>

          </div>
        )
      )}
    </div>
  );
}