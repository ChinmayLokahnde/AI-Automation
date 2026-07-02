import { Handle, Position } from "@xyflow/react";

export default function IfNode({ data }) {
  return (
    <div className="bg-amber-200 rounded-xl px-5 py-4 border shadow min-w-[130px]">

      <Handle
        type="target"
        position={Position.Left}
      />

      <div className="font-semibold text-center">
        {data.label}
      </div>

      <div className="absolute right-2 top-3 text-[10px] text-green-700 font-bold">
        TRUE
      </div>

      <Handle
        id="true"
        type="source"
        position={Position.Right}
        style={{ top: "30%" }}
      />

      <div className="absolute right-2 bottom-3 text-[10px] text-red-700 font-bold">
        FALSE
      </div>

      <Handle
        id="false"
        type="source"
        position={Position.Right}
        style={{ top: "70%" }}
      />

    </div>
  );
}