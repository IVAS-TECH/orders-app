import valueFilter, { SetValueFilter } from './valueFilter';
import { Reducer } from 'redux';
import DateType from '../../../type/Date';
import format from 'date-fns/format';

export type SetDateFilter<SetDate extends string> = SetValueFilter<SetDate, DateType>;

export default function<SetDate extends string>(
    setDate: SetDate
): {
    reducer: Reducer<DateType, SetDateFilter<SetDate>>,
    action: {
        setDate: (date: DateType) => SetDateFilter<SetDate>,
        setNow: () => SetDateFilter<SetDate>
    }
} {
    const { reducer, action } = valueFilter(setDate, now());
    return {
        reducer,
        action: {
            setDate: action.set,
            setNow: () => action.set(now())
        }
    }
};

export function selectFormatedDate(date: DateType): string {
    return format(date, 'dd.MM.yyyy');
}

function now(): DateType {
    return new Date();
}