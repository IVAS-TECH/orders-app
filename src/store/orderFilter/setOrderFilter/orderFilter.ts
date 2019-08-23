import { combineReducers } from 'redux';
import startDateReducer, { setDate as setStartDate, setNow as setStartDateToNow } from './startDate';
import endDateReducer, { setDate as setEndDate, setNow as setEndDateToNow } from './endDate';
import statusReducer, { toggleKey as toggleStatus, order as statusOrder } from './status';
import orderedByReducer, { toggleKey as toggleOrderedBy } from './orderedBy';
import fileExtentionReducer, { toggleKey as toggleFileExtention, order as fileExtentionOrder } from './fileExtention';
import fileNameReducer, { setFileName } from './fileName';
import { selectIsFilterEmpty } from './keyedFilter';
import setFilterStepReducer, { previousFilterStep, nextFilterStep, resetFilterStep } from './setFilterStep';
import OrderFilter from '../../../type/OrderFilter';

export {
    setStartDate,
    setStartDateToNow,
    setEndDate,
    setEndDateToNow,
    toggleStatus,
    statusOrder,
    toggleOrderedBy,
    toggleFileExtention,
    fileExtentionOrder,
    setFileName,
    previousFilterStep,
    nextFilterStep,
    resetFilterStep
};

const reducerMap = {
    startDate: startDateReducer,
    endDate: endDateReducer,
    status: statusReducer,
    orderedBy: orderedByReducer,
    fileExtention: fileExtentionReducer,
    fileName: fileNameReducer,
    setFilterStep: setFilterStepReducer
};

const reducer = combineReducers(reducerMap);

export type State = ReturnType<typeof reducer>;

export default reducer;

export function selectStartDate(state: State): State['startDate'] {
    return state.startDate;
};

export function selectEndDate(state: State): State['endDate'] {
    return state.endDate;
};

export function selectStatus(state: State): State['status'] {
    return state.status;
}; 

export function selectOrderedBy(state: State): State['orderedBy'] {
    return state.orderedBy;
};

export function selectFileExtention(state: State): State['fileExtention'] {
    return state.fileExtention;
};

export function selectFileName(state: State): State['fileName'] {
    return state.fileName;
};

export function selectSetFilterStep(state: State): State['setFilterStep'] {
    return state.setFilterStep;
};

const mapStepToKey = {
    'status': 'status' as 'status',
    'ordered-by': 'orderedBy' as 'orderedBy',
    'file-extention': 'fileExtention' as 'fileExtention'
};

export function selectIsOrderFilterEmpty(state: State): boolean {
    const step = state.setFilterStep;
    if(step === 'status' || step === 'ordered-by' || step === 'file-extention') {
        return selectIsFilterEmpty(state[mapStepToKey[step]]);
    } else {
        return true;
    }
};

export function selectOrderFilter(state: State): OrderFilter {
    const { setFilterStep, ...orderFilter } = state;
    return orderFilter;
};