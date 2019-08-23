import { Reducer } from 'redux';
import { KeyedFilter } from '../../../type/OrderFilter';
import { createSelector } from 'reselect';

export type ToggleKeyAction<
    ToggleKey extends string,
    Key extends string
> = {
    type: ToggleKey,
    key: Key 
};

export default function<
    ToggleKey extends string,
    Key extends string
>(
    toggleKey: ToggleKey,
    initalState: KeyedFilter<Key>,
): {
    reducer: Reducer<KeyedFilter<Key>, ToggleKeyAction<ToggleKey, Key>>,
    action: {
        toggleKey: (key: Key) => ToggleKeyAction<ToggleKey, Key>
    }
} {
    return {
        reducer: (state = initalState, action) => {
            if(action.type === toggleKey) {
                const { key } = action as ToggleKeyAction<ToggleKey, Key>;
                return { ...state, [key]: !state[key] };
            } else {
                return state;
            }
        },
        action: {
            toggleKey: key => ({ type: toggleKey, key })
        }
    };
};

export function selectPicked<Key extends string>(keyedFilter: KeyedFilter<Key>, order?: Array<Key>): Array<Key> {
    const filter: (key: Key) => boolean = key => keyedFilter[key];
    return order
        ? order.filter(filter)
        : (Object.keys(keyedFilter) as Array<Key>).filter(filter).sort();
};

const selectIsFilterEmpty = createSelector(idFilter, isFilterEmpty);

export { selectIsFilterEmpty }

type FilterObject = { [key: string]: boolean };

function isFilterEmpty(keyedFilter: FilterObject): boolean {
    return Object.keys(keyedFilter).some(key => keyedFilter[key]);
};

function idFilter(keyedFilter: FilterObject): FilterObject {
    return keyedFilter;
}