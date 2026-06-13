import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Topbar ({
    workflowName,
    setWorkflowName,
    onSave,
    onRun,
}){
    return(
         <div className="flex items-center justify-between border-b px-4 py-3 bg-white">
            <Input value={workflowName} onChange={(e)=> setWorkflowName(e.target.value)} placeholder="Workflow Name" className="max-w-sm" />
            <div>
                <Button onClick ={onSave}> Save </Button>
                <Button variant="secondary" onClick={onRun}>Run</Button>
            </div>
         </div>
    )

}