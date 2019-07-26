import React from 'react';
import Select, {Option} from './components/Select';
import Input from './components/Input';
import CheckboxWithLabel from './components/CheckboxWithLabel';
import Button from '@material-ui/core/Button';
import createForm, { FormField, FormState } from './store/form/reducer';
import {connect} from 'react-redux';

type Value = 'ivo' | 'bobi';

interface Fields {
    select: {
        value: Value,
        initialValue: ''
    }
    input: {
        value: string,
        initialValue: ''
    },
    checkbox: {
        value: boolean,
        initialValue: false
    }
}

interface Validation {
    select: {
        required: typeof validate
    },
    input: {
        required: typeof validate
    }
}

type State = FormState<Fields, Validation>;

type SelectField = FormField<Fields, Validation, 'select'>;
type InputField = FormField<Fields, Validation, 'input'>;
type CheckboxField = FormField<Fields, Validation, 'checkbox'>;

interface AppProps {
    select: {
        value: SelectField['value'],
        error: SelectField['error']
    },
    input: {
        value: InputField['value'],
        error: InputField['error']
    }
    checkbox: CheckboxField['value'],
    setSelectValue: SelectField['setValue'],
    setInputValue: InputField['setValue'],
    setCheckboxValue: CheckboxField['setValue'],
    validateInput: InputField['validate'],
    validateSelect: SelectField['validate'],
    validateAll: () => void
}

const options: Option<Value>[] = [
    {value: 'ivo', text: 'Ivo'},
    {value: 'bobi', text: 'Bobi'}
];

function validate(value: string): boolean {
    return value !== '';
}

export const form = createForm<Fields, Validation>({
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

const App: React.FC<AppProps> = ({select, input, checkbox, setSelectValue, setInputValue, setCheckboxValue, validateInput, validateSelect, validateAll}: AppProps) => (
    <div>
        <Select
            id="select"
            label='Label'
            value={select.value}
            error={select.error}
            onValueChange={setSelectValue}
            onClose={validateSelect}
            notSelectedText='not selected'
            options={options} />
        <Input
            id="input"
            label="Input"
            value={input.value}
            error={input.error}
            onValueChange={setInputValue}
            onBlur={validateInput} />
        <CheckboxWithLabel
            label="Checkbox"
            checked={checkbox}
            onToggle={setCheckboxValue}
        />
        <Button color='primary' onClick={validateAll}>
            submit
        </Button>
    </div>
);

export default connect(
    (state: State) => ({
        select: {
            value: form.selectors.value.select(state),
            error: form.selectors.error.select(state) 
        },
        input: {
            value: form.selectors.value.input(state),
            error: form.selectors.error.input(state) 
        },
        checkbox: form.selectors.value.checkbox(state)
    }),
    {
        setSelectValue: form.actions.setValue.select,
        setInputValue: form.actions.setValue.input,
        setCheckboxValue: form.actions.setValue.checkbox,
        validateInput: form.actions.validate.input,
        validateSelect: form.actions.validate.select,
        validateAll: form.actions.validateAll
    }
)(App);
