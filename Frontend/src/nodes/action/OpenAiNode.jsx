import { Handle, Position } from "@xyflow/react";

export default function OpenAiNode({ data }) {
  return (
    <div className="bg-green-100 border rounded p-4 min-w-[150px]">
      <div>OpenAI</div>

      <Handle
        type="target"
        position={Position.Left}
      />

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}