import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import { selectFormatedDate } from './setOrderFilter/dateFilter';
import { selectPickedFromStatus as _selectPickedFromStatus } from './setOrderFilter/status';
import { selectPickedFromOrderedBy as _selectPickedFromOrderedBy } from './setOrderFilter/orderedBy';
import { selectPickedFromFileExtention as _selectPickedFromFileExtention } from './setOrderFilter/fileExtention';
import { selectPicked } from './setOrderFilter/keyedFilter';
import orderFilterReducer, { selectOrderFilter } from './setOrderFilter/orderFilter';
import OrderFilter, { QueryFilter } from '../../type/OrderFilter';
import Action from '../../type/Action';
import { ROUTE_ORDER_HISTORY } from '../location/route';

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

const initialState: State = {
    currentOrderFilter: noCurrentOrderFilter,
    setOrderFilter: orderFilterReducer(undefined, { type: undefined })
};

export default function reducer(state: State = initialState, action: Action): State {
    if(action.type === ROUTE_ORDER_HISTORY) {
        return initialState;
    }
    if(action.type === SET_CURRENT_ORDER_FILTER) {
        const { setOrderFilter } = state;
        return {
            currentOrderFilter: selectOrderFilter(setOrderFilter),
            setOrderFilter
        };
    }
    const { currentOrderFilter, setOrderFilter } = state;
    return {
        currentOrderFilter,
        setOrderFilter: orderFilterReducer(setOrderFilter, action)
    };
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

const emptyArray = [] as any[];

export function selectPickedFromStatus(state: CurrentOrderFilterState): ReturnType<typeof _selectPickedFromStatus> {
    return state !== null ? _selectPickedFromStatus(state.status) : emptyArray;
};

export function selectPickedFromOrderedBy(state: CurrentOrderFilterState): ReturnType<typeof _selectPickedFromOrderedBy> {
    return  state !== null ? _selectPickedFromOrderedBy(state.orderedBy) : emptyArray;
};

export function selectPickedFromFileExtention(state: CurrentOrderFilterState): ReturnType<typeof _selectPickedFromFileExtention> {
    return  state !== null ? _selectPickedFromFileExtention(state.fileExtention) : emptyArray;
};

export function selectFileName(state: CurrentOrderFilterState): string {
    return state !== null ? state.fileName : '';
};

export function selectQueryFilter({
    startDate,
    endDate,
    status,
    orderedBy,
    fileExtention,
    fileName
}: OrderFilter): QueryFilter {
    return {
        startDate: startOfDay(startDate).toISOString(),
        endDate: endOfDay(endDate).toISOString(),
        status: _selectPickedFromStatus(status),
        orderedBy: selectPicked(orderedBy.idFilter),
        fileExtention: _selectPickedFromFileExtention(fileExtention),
        fileName
    };
};