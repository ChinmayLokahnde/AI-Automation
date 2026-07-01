import { Handle, Position } from "@xyflow/react";

export default function ScheduleNode({ data }) {
  return (
    <div className="bg-yellow-100 border rounded p-4 min-w-[150px]">
      <div>Schedule</div>

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}