import fetch from "node-fetch"
import { GoogleAuth } from 'google-auth-library';

async function parseResponse(response : Response) : Promise<string> {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
    }

    console.log(await response.json())
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = "";

    if (reader) {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
        }
    }
    return result;
}

export async function getSummaryWithTitle(text: string) : Promise<string> {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/cloud-platform'
    })
    const client = await auth.getClient()
    const accessToken = (await client.getAccessToken()).token
    const projectId = await auth.getProjectId();
    const modelId = "gemini-2.5-flash-lite" 

    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/${modelId}:generateContent`;

    const body = {
        contents: {
            role: "user",
            parts: [
                {
                    text: `Summarize the following text, and include a title as the first line.\n${text}`,
                },
            ],
        },
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
    }

    const json = await response.json();
    const summary = json.candidates[0].content.parts[0].text;
    return summary;
}
