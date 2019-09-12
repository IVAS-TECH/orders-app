import parseISO from 'date-fns/parseISO';
import OrderStatus from './../type/OrderStatus';
import ServerFile from './../type/ServerFile';
import OrderInfo from './../type/OrderInfo';

export interface OrderInfoFromServer {
    id: string,
    orderedBy: string,
    date: string,
    file: {
        name: string,
        id: string
    },
    status: OrderStatus
}

export default function formServerOrderInfoToClient({
    id,
    orderedBy,
    date,
    file,
    status
}: OrderInfoFromServer): OrderInfo {
    return {
        id,
        orderedBy,
        date: parseISO(date),
        file: new ServerFile(file.name, file.id),
        status
    };
};