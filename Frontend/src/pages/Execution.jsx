import { useEffect, useState } from "react";
import { getExecutions } from "../lib/workflowApi";
import { useNavigate } from "react-router-dom";

export default function ExecutionHistory() {

    const [executions, setExecutions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        loadExecutions();

    }, []);

    const loadExecutions = async () => {

        try {

            const data = await getExecutions();

            setExecutions(data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Execution History
            </h1>

            <table className="w-full border">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="border p-2">
                            Workflow
                        </th>

                        <th className="border p-2">
                            Status
                        </th>

                        <th className="border p-2">
                            Started
                        </th>

                        <th className="border p-2">
                            Finished
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {executions.map((execution) => (

                        <tr
                            key={execution._id}
                            className="hover:bg-gray-50 cursor-pointer"
                        >

                            <td className="border p-2">

                                {execution.workflowId?.name}

                            </td>

                            <td className="border p-2">

                                {execution.status}

                            </td>

                            <td className="border p-2">

                                {
                                    new Date(
                                        execution.startedAt
                                    ).toLocaleString()
                                }

                            </td>

                            <td className="border p-2">

                                {
                                    execution.finishedAt
                                        ? new Date(
                                              execution.finishedAt
                                          ).toLocaleString()
                                        : "--"
                                }

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}