import OrderStatus from './OrderStatus';
import ServerFile from './ServerFile';

interface OrderInfo {
    id: string,
    orderedBy: string,
    date: Date,
    file: ServerFile,
    status: OrderStatus
}

export default OrderInfo;