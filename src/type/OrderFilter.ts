import DateType from './Date';
import OrderStatus from './OrderStatus';

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

export interface QueryFilter {
    startDate: string,
    endDate: string,
    status: OrderStatus[],
    orderedBy: string[],
    fileExtention: FileExtention[],
    fileName: string
};