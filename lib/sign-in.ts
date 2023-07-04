import { fetchJson } from "./api";

const CMS_URL = process.env.CMS_URL;

export async function SignIn(email: string, password: string) {
    return await fetchJson(`http://127.0.0.1:1337/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
    });
}