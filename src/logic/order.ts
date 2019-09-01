import { StencilData } from "../type/StencilData";

export default function order(stencilData: StencilData, authToken: string): Promise<unknown> {
    const formData = new FormData();
    const { file, ...data } = stencilData;
    console.log(file);
    formData.append('archive', file as File, stencilData.fileName);
    formData.append('data', JSON.stringify(data));
    return fetch('/api/order', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` },
        body: formData
    }).then(response => response.json());
};