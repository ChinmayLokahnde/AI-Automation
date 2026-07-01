import { useEffect, useState } from "react";
import { getWorkflows } from "../lib/workflowApi";
import { useNavigate } from "react-router-dom";

export default function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadWorkflows();
  }, [navigate]);

  const loadWorkflows = async () => {
    try {
      const data = await getWorkflows();
      setWorkflows(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">

  
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          My Workflows
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/executions")}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          >
            Execution History
          </button>

          <button
            onClick={() => navigate("/create-workflow")}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            New Workflow
          </button>

        </div>

      </div>

      <div className="space-y-3">

        {workflows.length === 0 ? (
          <div className="text-gray-500 border rounded p-6 text-center">
            No workflows yet.
            <br />
            Click <strong>New Workflow</strong> to create one.
          </div>
        ) : (
          workflows.map((workflow) => (
            <div
              key={workflow._id}
              className="border rounded p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => navigate(`/workflow/${workflow._id}`)}
            >
              <h2 className="font-semibold text-lg">
                {workflow.name || "Untitled Workflow"}
              </h2>

              <p className="text-gray-600">
                Nodes: {workflow.nodes.length}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}