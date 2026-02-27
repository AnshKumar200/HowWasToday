import { auth } from "../firebase";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const request = async (method: string, path: string, body?: object) => {
    const token = await auth.currentUser?.getIdToken();

    const res = await fetch(`${BACKEND_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    if(!res.ok) throw new Error(await res.text());
    return res.json();
}

export const api = {
    post: (path: string, body:object) => request("POST", path, body),
    put: (path: string, body: object) => request("PUT", path, body),
    get: (path:string) => request("GET", path)
}
