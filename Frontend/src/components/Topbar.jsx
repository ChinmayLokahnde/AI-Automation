import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

export default function Topbar ({
    workflowName,
    setWorkflowName,
    onSave,
    onRun,}){

        const navigate = useNavigate();

        const logout = () => {
                localStorage.clear();
                navigate("/login");
            };


    return(
         <div className="flex justify-between items-center p-4 border-b">

    <Input
        className="w-96"
        placeholder="Workflow name"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
    />

    <div className="flex gap-3">

        <Button onClick={onSave}>
            Save
        </Button>

        <Button onClick={onRun}>
            Run
        </Button>

        <Button
            variant="destructive"
            onClick={logout}
        >
            Logout
        </Button>

    </div>

</div>
    )

}