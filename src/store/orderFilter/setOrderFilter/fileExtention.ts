import keyedFilter, { selectPicked } from './keyedFilter';
import { KeyedFilter, FileExtention } from '../../../type/OrderFilter';

const TOGGLE_KEY = 'ivas-tech/orders-app/orderFilter/fileExtention/TOGGLE_KEY';

const fileExtention = keyedFilter<typeof TOGGLE_KEY, FileExtention>(TOGGLE_KEY, {
    '.zip': true,
    '.rar': true,
    '.tar.gz': true,
    '.tgz': true
});

const order: Array<FileExtention> = ['.zip', '.rar', '.tar.gz', '.tgz'];

const { toggleKey } = fileExtention.action;

export { toggleKey, order };

export default fileExtention.reducer;

export function selectPickedFromFileExtention(filter: KeyedFilter<FileExtention>): Array<FileExtention> {
    return selectPicked(filter, order);
}