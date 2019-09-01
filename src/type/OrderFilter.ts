import DateType from './Date';

export type OrderStatus
= 'waiting'
| 'accepted'
| 'rejected'
| 'canceled'
| 'processing'
| 'ready'
| 'delivered';

export type OrderStatusMap<T> = Record<OrderStatus, T>;

export type FileExtention
= '.zip'
| '.rar'
| '.tar.gz'
| '.tgz';

export type KeyedFilter<Keys extends string> = Record<Keys, boolean>;

export interface OrderedByFilter {
    idFilter: KeyedFilter<string>,
    name: Record<string, string>
};

export default interface Filter {
    startDate: DateType,
    endDate: DateType,
    status: KeyedFilter<OrderStatus>,
    orderedBy: OrderedByFilter,
    fileExtention: KeyedFilter<FileExtention>,
    fileName: string
};