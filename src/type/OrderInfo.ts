import OrderStatus from './OrderStatus';

interface OrderInfo {
    id: string,
    orderedBy: string,
    date: Date,
    file: string,
    status: OrderStatus
}

export default OrderInfo;