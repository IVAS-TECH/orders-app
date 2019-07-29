import React from 'react';
import Select, {Option} from './components/Select';
import Input from './components/Input';
import CheckboxWithLabel from './components/CheckboxWithLabel';
import Button from '@material-ui/core/Button';
import createForm, { FormField, FormState, FormFieldsValues } from './store/form/reducer';
import {connect} from 'react-redux';

type Value = 'ivo' | 'bobi';

interface Fields {
    select: {
        value: Value,
        initialValue: '',
        validation: {
            required: typeof validate
        }
    }
    input: {
        value: string,
        initialValue: '',
        validation: {
            required: typeof validate
        }
    },
    checkbox: {
        value: boolean,
        initialValue: false,
        validation: undefined
    }
}

type State = FormState<Fields>;

type SelectField = FormField<Fields, 'select'>;
type InputField = FormField<Fields, 'input'>;
type CheckboxField = FormField<Fields, 'checkbox'>;

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
    validateForm: () => void,
    isValid: () => boolean,
    values: FormFieldsValues<Fields>
}

const options: Option<Value>[] = [
    {value: 'ivo', text: 'Ivo'},
    {value: 'bobi', text: 'Bobi'}
];

function validate(value: string): boolean {
    return value !== '';
}

export const form = createForm<Fields>({
    formName: 'test',
    fields: {
        select: {
            initialValue: '',
            validation: {
                required: validate
            },
            condition: 'checkbox'
        },
        input: {
            initialValue: '',
            validation: {
                required: validate
            },
            condition: 'checkbox'
        },
        checkbox: {
            initialValue: false,
            validation: undefined
        }
    }
});

const App: React.FC<AppProps> = ({select, input, checkbox, setSelectValue, setInputValue, setCheckboxValue, validateForm, isValid, values}: AppProps) => (
    <div>
        {checkbox && <Select
            id="select"
            label='Label'
            value={select.value}
            error={select.error}
            onValueChange={setSelectValue}
            notSelectedText='not selected'
            options={options} />
        }
        <Input
            id="input"
            label="Input"
            value={input.value}
            error={input.error}
            disabled={!checkbox}
            onValueChange={setInputValue} />
        <CheckboxWithLabel
            label="Checkbox"
            checked={checkbox}
            onToggle={setCheckboxValue}
        />
        <Button color='primary' onClick={() => {
            if(isValid()) {
                console.log(values)
            } else {
                validateForm()
            }
        }}>
            submit
        </Button>
    </div>
);

export default connect(
    (state: State) => ({
        select: {
            value: form.selectors.field.select.value(state),
            error: form.selectors.field.select.error(state) 
        },
        input: {
            value: form.selectors.field.input.value(state),
            error: form.selectors.field.input.error(state) 
        },
        checkbox: form.selectors.field.checkbox.value(state),
        isValid: () => form.selectors.form.isValid(state),
        values: form.selectors.form.values(state)
    }),
    {
        setSelectValue: form.actions.setValue.select,
        setInputValue: form.actions.setValue.input,
        setCheckboxValue: form.actions.setValue.checkbox,
        validateForm: form.actions.validateForm
    }
)(App);
