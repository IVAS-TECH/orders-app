export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestInput<Data extends { [K in keyof Data]: Data[K] }> {
    url: string,
    method: Method,
    data: Data,
    token?: string
};

export default function request<
    Data extends { [K in keyof Data]: Data[K] },
    Result extends { [K in keyof Result]: Result[K] }
>({
    url,
    method,
    data,
    token
}: RequestInput<Data>): Promise<Result> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if(token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(data)
    }).then(response => response.json());
};