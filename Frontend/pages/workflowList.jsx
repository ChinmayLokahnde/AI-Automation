import { useEffect, useState } from "react";
import { getWorkflow } from "@/lib/workflowApi";
import { useNavigate } from "react-router-dom";
import { getWorkflows } from "../src/lib/workflowApi";

export default function WorkflowList() {

  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    const data = await getWorkflows();

   
    setWorkflows(data);
  };

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          My Workflows
        </h1>

        <button
          onClick={() =>
            navigate("/create-workflow")
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          New Workflow
        </button>
      </div>

      <div className="space-y-3">

        {workflows.map((workflow) => (

          <div
            key={workflow._id}
            className="border p-4 rounded cursor-pointer"
            onClick={() =>
              navigate(`/workflow/${workflow._id}`)
            }
          >
            <h2 className="font-semibold">
              {workflow.name || "Untitled Workflow"}
            </h2>

            <p>
              Nodes: {workflow.nodes.length}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}