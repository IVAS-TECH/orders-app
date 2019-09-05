import { OrderData } from "../type/OrderData";

export default function order(orderData: OrderData, authToken: string): Promise<unknown> {
    const formData = new FormData();
    const { file, ...data } = orderData;
    console.log(file);
    formData.append('archive', file as File, orderData.fileName);
    formData.append('data', JSON.stringify(data));
    return fetch('/api/order', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` },
        body: formData
    }).then(response => response.json());
};