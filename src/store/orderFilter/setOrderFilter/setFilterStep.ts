import { createReducer } from '../../utils';

export const PREVIOUS_FILTER_STEP = 'ivas-tech/orders-app/orderFilter/setFilterStep/PREVIOUS_FILTER_STEP';

export const NEXT_FILTER_STEP = 'ivas-tech/orders-app/orderFilter/setFilterStep/NEXT_FILTER_STEP';

export const RESET_FILTER_STEP = 'ivas-tech/orders-app/orderFilter/setFilterStep/RESET_FILTER_STEP';

export type FilterStep
= 'start-date'
| 'end-date'
| 'status'
| 'ordered-by'
| 'file-extention'
| 'file-name';

export type FilterStepMap<T> = {
    [Filter in FilterStep]: T
};

export interface PreviousFilterStep {
    type: typeof PREVIOUS_FILTER_STEP
};

export interface NextFilterStep {
    type: typeof NEXT_FILTER_STEP
};

export interface ResetFilterStep {
    type: typeof RESET_FILTER_STEP
};

export function previousFilterStep(): PreviousFilterStep {
    return { type: PREVIOUS_FILTER_STEP };
};

export function nextFilterStep(): NextFilterStep {
    return { type: NEXT_FILTER_STEP };
};

export function resetFilterStep(): ResetFilterStep {
    return { type: RESET_FILTER_STEP };
};

const filterStepIndex: FilterStepMap<number> = {
    'start-date': 0,
    'end-date': 1,
    'status': 2,
    'ordered-by': 3,
    'file-extention': 4,
    'file-name': 5
};

const filterSteps: ['start-date', 'end-date', 'status', 'ordered-by', 'file-extention', 'file-name']
                 = ['start-date', 'end-date', 'status', 'ordered-by', 'file-extention', 'file-name'];

const reducer = createReducer('start-date' as FilterStep, {
    [PREVIOUS_FILTER_STEP]: (
        state: FilterStep,
        _action: PreviousFilterStep
    ) => {
        const index = filterStepIndex[state];
        return index === 0 ? state : filterSteps[index - 1];
    },
    [NEXT_FILTER_STEP]: (
        state: FilterStep,
        _action: NextFilterStep
    ) => {
        const index = filterStepIndex[state];
        return index === (filterSteps.length - 1) ? state : filterSteps[index + 1];
    },
    [RESET_FILTER_STEP]: (
        _state: FilterStep,
        _action: ResetFilterStep
    ) => {
        return filterSteps[0]; 
    }
});

export default reducer;

export { filterStepIndex, filterSteps };