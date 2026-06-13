import { nodeRegistry } from "../lib/nodeRegistry";


export default function NodeConfig({node}){
  if (!node) {
    return (
      <div className="w-80 border-l p-4 bg-white">
        <p className="text-gray-500">
          Select a node
        </p>
      </div>
    );
  }

  const config = nodeRegistry[node.data.kind];

  return (
    <div className="w-80 border-l p-4 bg-white">

      <h2 className="font-bold text-lg mb-4">
        {node.data.label}
      </h2>

      <div className="space-y-4">
        {config?.fields?.map((field) => (
          <div key={field.key}>
            <label className="block mb-1">
              {field.label}
            </label>

            <input
              className="border rounded p-2 w-full"
              placeholder={field.label}
            />
          </div>
        ))}
      </div>

    </div>
  )
}