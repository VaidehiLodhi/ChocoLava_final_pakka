export const summarizeLogs = async(logs : any[]) => {
    try {
        const flaskRes = await fetch("http://localhost:8080/api/summarize",{
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({logs})
        })

        if(!flaskRes.ok) {
            throw new Error(`Flask API error: ${flaskRes.statusText}`)
        }

        const data = await flaskRes.json();
        return data;
    } catch(error) {
        console.error("Error fetching summary:", error);
        return { response: "Failed to summarize logs." }; 
    }
}