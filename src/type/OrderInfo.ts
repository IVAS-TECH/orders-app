import OrderStatus from './OrderStatus';

interface OrderInfo {
    id: string,
    orderedBy: string,
    date: Date,
    file: {
        name: string,
        id: string
    },
    status: OrderStatus
}

export default OrderInfo;