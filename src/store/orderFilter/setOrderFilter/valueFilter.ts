import { Reducer } from 'redux';

export type SetValueFilter<SetValue extends string, Value> = {
    type: SetValue,
    value: Value
};

export default function<SetValue extends string, Value>(
    setValue: SetValue,
    inital: Value
): {
    reducer: Reducer<Value, SetValueFilter<SetValue, Value>>,
    action: {
        set: (value: Value) => SetValueFilter<SetValue, Value>,
    }
} {
    return {
        reducer: (state = inital, action) => (
            (action.type === setValue) && ((action as SetValueFilter<SetValue, Value>).value !== state)
                ? (action as SetValueFilter<SetValue, Value>).value
                : state
        ),
        action: {
            set: value => ({ type: setValue, value })
        }
    };
};