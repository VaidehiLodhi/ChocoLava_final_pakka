"use client"

import { useEffect, useState } from "react"

export const FlaskRequester =()=> {

    const [response, setResponse] = useState("Loading");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGeminiResponse = async() => {
            try {
                const res = await fetch("http://localhost:8080/api/home", {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({prompt : "Tell me something interesting about birds"}),
                })

                if (!res.ok) {
                  const errorText = await res.text(); // Get error message
                  throw new Error(
                    `HTTP error! Status: ${res.status} - ${errorText}`
                  );
                }

                const data = await res.json();
                setResponse(data.response);
    
            } catch (err : any) {
                setError("Failed to catch response." + err.message);
            }
        }

        fetchGeminiResponse()

    }, [])

    return (
        <div>
            <p>{error}</p>
            <p>{response}</p>
        </div>
    )
}