import { OrderData } from "../type/OrderData";
import request from './request';

export default function order(orderData: OrderData, authToken: string): Promise<unknown> {
    const { file, ...data } = orderData;
    if(file instanceof File) {
        const formData = new FormData();
        formData.append('archive', file as File, orderData.fileName);
        formData.append('data', JSON.stringify(data));
        return fetch('/api/order', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${authToken}` },
            body: formData
        }).then(response => response.json());
    }
    return request({
        url: `/api/order/file/${file.id}`,
        method: 'POST',
        data,
        token: authToken
    });
};