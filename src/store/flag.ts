import { createReducer } from './utils';
import { Reducer } from 'redux';

export const TURN_ON_FLAG = 'ivas-tech/orders-app/flag/TURN_ON_FLAG';

export const TURN_OFF_FLAG = 'ivas-tech/orders-app/flag/TURN_OFF_FLAG';

export interface TurnOnFlag<Flag extends { [F in keyof Flag]: boolean }> {
    type: typeof TURN_ON_FLAG,
    key: string,
    flag: keyof Flag
};

export interface TurnOffFlag<Flag extends { [F in keyof Flag]: boolean }> {
    type: typeof TURN_OFF_FLAG,
    key: string,
    flag: keyof Flag
};

export function turnOnFlag<
    Flag extends { [F in keyof Flag]: boolean }
>(key: string, flag: keyof Flag): TurnOnFlag<Flag> {
    return { type: TURN_ON_FLAG, key, flag };
};

export function turnOffFlag<
    Flag extends { [F in keyof Flag]: boolean }
>(key: string, flag: keyof Flag): TurnOffFlag<Flag> {
    return { type: TURN_OFF_FLAG, key, flag };
};

export default function create<
    Flag extends { [F in keyof Flag]: boolean }
>(initalState: Flag, id: string): {
    reducer: Reducer<Flag, TurnOnFlag<Flag> | TurnOffFlag<Flag>>,
    action: {
        turnOn: (flag: keyof Flag) => TurnOnFlag<Flag>,
        turnOff: (flag: keyof Flag) => TurnOffFlag<Flag>
    }
} {
    return {
        reducer: createReducer(initalState, {
            [TURN_ON_FLAG]: (
                state: Flag,
                { key, flag }: TurnOnFlag<Flag>
            ) => (key === id ? {...state, [flag]: true} : state),
            [TURN_OFF_FLAG]: (
                state: Flag,
                { key, flag }: TurnOffFlag<Flag>
            ) => (key === id ? {...state, [flag]: false} : state)
        }),
        action: {
            turnOn: flag => turnOnFlag(id, flag),
            turnOff: flag => turnOffFlag(id, flag)
        }
    };
};