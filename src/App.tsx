import React from 'react';
import Select, {Option} from './components/Select';
import Input from './components/Input';
import CheckboxWithLabel from './components/CheckboxWithLabel';
import createReducer from './store/form/reducer';
import {setFormFieldValueWithValidation} from './store/form/actions';

type Value = 'ivo' | 'bobi';

function log<V>(value: V): void {
    console.log({value});
}

const options: Option<Value>[] = [
    {value: 'ivo', text: 'Ivo'},
    {value: 'bobi', text: 'Bobi'}
];

interface Fields {
    select: Value,
    input: string,
    checkbox: boolean
}

interface InitialValues {
    select: '',
    input: '',
    checkbox: false
}

interface Validation {
    select: {
        required: 'required'
    },
    input: {
        required: 'required'
    }
}

function validate(value: string): boolean {
    return value !== '';
}

const reducer = createReducer<Fields, InitialValues, Validation>({
    formName: 'test',
    fields: {
        select: {
            initialValue: '',
            validation: {
                required: validate
            }
        },
        input: {
            initialValue: '',
            validation: {
                required: validate
            }
        },
        checkbox: {
            initialValue: false,
            validation: undefined
        }
    }
});

const state = reducer(undefined, setFormFieldValueWithValidation('test', 'select', 'ivo'));

console.log(state);

const App: React.FC = () => (
    <div>
        <Select
            id="select"
            label='Label'
            value={state.fields.select.value}
            onValueChange={log}
            notSelectedText='not selected'
            options={options}
            error='This field is required' />
        <Input
            id="input"
            label="Input"
            value={state.fields.input.value}
            onValueChange={log}
            error='This field is required' />
        <CheckboxWithLabel
            label="Checkbox"
            checked={state.fields.checkbox}
            onToggle={() => console.log("toggle")}
        />
    </div>
);

export default App;
