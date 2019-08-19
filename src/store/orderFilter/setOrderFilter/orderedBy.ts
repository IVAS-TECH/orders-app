import keyedFilter, { selectPicked } from './keyedFilter';
import { KeyedFilter } from '../../../type/OrderFilter';

const TOGGLE_KEY = 'ivas-tech/orders-app/orderFilter/orderedBy/TOGGLE_KEY';

const temp = ['Ivo Stratev', 'Borislav Stratev', 'Ivan Petrov', 'Grigor Dimitrov', 'Dimitar Petrov',
'Ivan Shoov', 'Boris Dimitrov', 'Ivan Ivanov', 'Tanq Andonova'];

const tempInitial = temp.reduce((obj, person) => {
    obj[person] = true;
    return obj
 }, {} as { [key: string]: boolean });

const fileExtention = keyedFilter<typeof TOGGLE_KEY, string>(TOGGLE_KEY, tempInitial /* {} */ );

const { toggleKey } = fileExtention.action;

export { toggleKey };

export default fileExtention.reducer;

export function selectPickedFromOrderedBy(filter: KeyedFilter<string>): string[] {
    return selectPicked(filter);
}