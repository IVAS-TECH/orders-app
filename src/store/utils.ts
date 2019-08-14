import { Reducer } from 'redux';

type Action<State, ActionType, ReducerAction> = ReducerAction extends (state: State, action: infer A) => State
    ? A extends {
        type: ActionType
    }
        ? A
        : never
    : never;

type Constaint<State, ReducerMap extends {
    [ActionType in keyof ReducerMap]: ReducerMap[ActionType]
}> = {
    [ActionType in keyof ReducerMap]: (
        state: State,
        action: Action<State, ActionType, ReducerMap[ActionType]>
    ) => State
};

type Actions<State, ReducerMap extends Constaint<State, ReducerMap>>
    = keyof ReducerMap extends string
     ? Parameters<ReducerMap[keyof ReducerMap]>[1]
     : never;

export function createReducer<
    State,
    ReducerMap extends Constaint<State, ReducerMap>
>(initialState: State, reducerMap: ReducerMap): Reducer<
    State,
    Actions<State, ReducerMap>
> {
    return (state, action) => {
        if(state !== undefined) {
            const { type } = action as { type: keyof ReducerMap };
            const reducer = reducerMap[type];
            return reducer ? reducer(state, action) : state;
        }
        return initialState;
    };
}