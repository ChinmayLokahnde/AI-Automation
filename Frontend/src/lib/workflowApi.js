

const API_URL = "http://localhost:5000/api/workflow";

export const createWorkflow = async (workfowData, token) =>{
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workfowData)
    });
    const data = await response.json()
    if(!response.ok){
        console.log("backend err", data)
        throw new Error(data.message);
    };
    return data;
}

export const getWorkflows = async()=>{
    const response = await fetch("http://localhost:5000/api/workflow");
    return await response.json();
}

export const getWorkflow = async (id) => {
  const response = await fetch(
    `http://localhost:5000/api/workflow/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to load workflow");
  }

  return await response.json();
};