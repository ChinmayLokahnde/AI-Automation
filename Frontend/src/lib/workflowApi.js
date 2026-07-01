

const API_URL = "http://localhost:5000/api/workflow";

export const createWorkflow = async (workflowData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workflowData)
    });

    const data = await response.json();

    if (!response.ok) {
        console.log("backend err", data);
        throw new Error(data.message);
    }

    return data;
};

export const getWorkflows = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/workflow",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export const getWorkflow = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/workflow/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load workflow");
    }

    return await response.json();
};

export const getExecutions = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/workflow/executions",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load executions");
    }

    return await response.json();
};