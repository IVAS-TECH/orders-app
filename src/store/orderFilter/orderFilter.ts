import { selectFormatedDate } from './setOrderFilter/dateFilter';
import { selectPickedFromStatus as _selectPickedFromStatus } from './setOrderFilter/status';
import { selectPickedFromOrderedBy as _selectPickedFromOrderedBy } from './setOrderFilter/orderedBy';
import { selectPickedFromFileExtention as _selectPickedFromFileExtention } from './setOrderFilter/fileExtention';
import orderFilterReducer, { selectOrderFilter } from './setOrderFilter/orderFilter';
import OrderFilter from '../../type/OrderFilter';

export type CurrentOrderFilterState = null | OrderFilter;

export type SetOrderFilterState = ReturnType<typeof orderFilterReducer>

export type State = {
    currentOrderFilter: CurrentOrderFilterState,
    setOrderFilter: SetOrderFilterState
};

export const SET_CURRENT_ORDER_FILTER = 'ivas-tech/orders-app/orderFilter/SET_CURRENT_FILTER';

export interface SetCurrentOrderFilter {
    type: typeof SET_CURRENT_ORDER_FILTER
};

export function setCurrentOrderFilter(): SetCurrentOrderFilter {
    return { type: SET_CURRENT_ORDER_FILTER };
};

const noCurrentOrderFilter = null as CurrentOrderFilterState;

export default function reducer(state: State | undefined, action: { type: string }): State {
    if(state === undefined) {
        return {
            currentOrderFilter: noCurrentOrderFilter ,
            setOrderFilter: orderFilterReducer(undefined, action)
        };
    } else {
        if(action.type === SET_CURRENT_ORDER_FILTER) {
            const { setOrderFilter } = state;
            return {
                currentOrderFilter: selectOrderFilter(setOrderFilter),
                setOrderFilter
            };
        } else {
            const { currentOrderFilter, setOrderFilter } = state;
            return {
                currentOrderFilter,
                setOrderFilter: orderFilterReducer(setOrderFilter, action)
            };
        }
    }
};

export function selectCurrentOrderFilter(state: State): CurrentOrderFilterState {
    return state.currentOrderFilter;
};

export function selectSetOrderFilter(state: State): SetOrderFilterState {
    return state.setOrderFilter;
};

export function selectDateRange(state: CurrentOrderFilterState): string {
    return state !== null
        ?  `${selectFormatedDate(state.startDate)} - ${selectFormatedDate(state.endDate)}`
        : '';
};

export function selectPickedFromStatus(state: CurrentOrderFilterState): ReturnType<typeof _selectPickedFromStatus> {
    return state !== null ? _selectPickedFromStatus(state.status) : [];
};

export function selectPickedFromOrderedBy(state: CurrentOrderFilterState): ReturnType<typeof _selectPickedFromOrderedBy> {
    return  state !== null ?  _selectPickedFromOrderedBy(state.orderedBy) : [];
};

export function selectPickedFromFileExtention(state: CurrentOrderFilterState): ReturnType<typeof _selectPickedFromFileExtention> {
    return  state !== null ? _selectPickedFromFileExtention(state.fileExtention) : [];
};

export function selectFileName(state: CurrentOrderFilterState): string {
    return state !== null ? state.fileName : '';
};