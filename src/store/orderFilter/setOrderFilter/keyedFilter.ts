import { Reducer } from 'redux';
import { KeyedFilter } from '../../../type/OrderFilter';

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
}