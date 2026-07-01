import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const authHeader = async () => {

    const token = await getUserToken();
    

    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store'
    });
    
    if (!res?.ok) {
        // console.error(`Fetch failed for ${path}:`, res.status);
        return null; 
    }

    return res.json();
}

export const protectedFetch = async (path) => {
    const fullUrl = `${baseUrl}${path}`;
    // console.log("Requesting URL:", fullUrl);
    
    const res = await fetch(fullUrl,
        {
            headers: await authHeader()
        }
    );

    // handle 401, 403

    return handleStatusCode(res);
}


export const serverMutation = async (path, data, method = 'POST') => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader()
        },
    };

    if (data) config.body = JSON.stringify(data);

    const res = await fetch(`${baseUrl}${path}`, config);

    if (!res.ok) return null;

    return handleStatusCode(res);
}

// handle 401, 404, 403
const handleStatusCode = res => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

    return res.json()
}
