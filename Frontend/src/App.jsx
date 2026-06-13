
import { useState } from "react"
import CreateFlow from "./components/CreateWorkflow"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReactFlowProvider } from "@xyflow/react"


function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/create-workflow" 
      element={
      <ReactFlowProvider>
      <CreateFlow/>
      </ReactFlowProvider>
      } />
    </Routes>
    </BrowserRouter>
  )
}


export default App
