
import { useState } from "react"
import CreateFlow from "./components/CreateWorkflow"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReactFlowProvider } from "@xyflow/react"
import WorkflowList from "./pages/workflowList"
import Login from "./pages/Login";
import Register from "./pages/Register"
import ExecutionHistory from "./pages/Execution"

function CreateFlowPage() {
  return (
    <ReactFlowProvider>
      <CreateFlow />
    </ReactFlowProvider>
  );
}

function App() {
  return(
    <BrowserRouter>
    <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
          <Route
            path="/executions"
            element={<ExecutionHistory />}
        />

        <Route
          path="/"
          element={<WorkflowList />}
        />

        <Route
          path="/create-workflow"
          element={<CreateFlowPage />}
        />

        <Route
          path="/workflow/:id"
          element={<CreateFlowPage />}
        />

      </Routes>

     
    </BrowserRouter>
  )
}


export default App
