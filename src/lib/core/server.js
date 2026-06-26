const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store' 
    });
    // handle 401, 403, 404
    return res.json();
}

// export const serverMutation = async (path, data, method = 'POST') => {
//     const res = await fetch(`${baseUrl}${path}`, {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     // handle 401, 404, 403

//     return res.json();
// }

export const serverMutation = async (path, data, method = 'POST') => {
    const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };

    if (data) config.body = JSON.stringify(data);

    const res = await fetch(`${baseUrl}${path}`, config);
    
    if (!res.ok) return null;

    return await res.json();
}
