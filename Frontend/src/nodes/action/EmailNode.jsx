import { Handle, Position } from "@xyflow/react";

export default function EmailNode({ data }) {
  return (
    <div className="bg-blue-100 border rounded p-4 min-w-[150px]">
      <div>Email</div>

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