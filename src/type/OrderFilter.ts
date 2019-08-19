import DateType from './Date';

export type OrderStatus
= 'waiting'
| 'accepted'
| 'rejected'
| 'canceled'
| 'processing'
| 'ready'
| 'delivered';

export type FileExtention
= '.zip'
| '.rar'
| '.tar.gz'
| '.tgz';

export type KeyedFilter<Keys extends string> = {
    [Key in Keys]: boolean
};

export default interface Filter {
    startDate: DateType,
    endDate: DateType,
    status: KeyedFilter<OrderStatus>,
    orderedBy: KeyedFilter<string>,
    fileExtention: KeyedFilter<FileExtention>,
    fileName: string
};