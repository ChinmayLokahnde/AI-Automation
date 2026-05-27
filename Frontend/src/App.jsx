
import { useState } from "react"
import CreateFlow from "./components/CreateWorkflow"
import { TriggerSheet } from "./components/TriggerSheet"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/create-workflow" element={<CreateFlow/>} />
    </Routes>
    </BrowserRouter>
  )
}


export default App
