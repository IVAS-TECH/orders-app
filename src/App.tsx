import React from 'react';
import Select, {Option} from './components/Select';
import Input from './components/Input';
import NumberInput from './components/NumberInput';
import CheckboxWithLabel from './components/CheckboxWithLabel';
import Button from '@material-ui/core/Button';
import createForm, { FormField, FormState, FormFieldsValues, FormFieldValueValidation } from './store/form/reducer';
import {connect} from 'react-redux';

type Value = 'ivo' | 'bobi';

interface Fields {
    select: {
        value: Value,
        initialValue: '',
        validation: {
            required: FormFieldValueValidation<Value | ''>
        }
    }
    input: {
        value: string,
        initialValue: '',
        validation: {
            required: FormFieldValueValidation<string>,
            match: typeof match
        }
    },
    checkbox: {
        value: boolean,
        initialValue: false,
        validation: never
    },
    number: {
        value: number | '',
        initialValue: 1,
        validation: {
            required: FormFieldValueValidation<number | ''>,
            min: FormFieldValueValidation<number | ''>
        }
    }
}

type State = FormState<Fields>;

type SelectField = FormField<Fields, 'select'>;
type InputField = FormField<Fields, 'input'>;
type CheckboxField = FormField<Fields, 'checkbox'>;
type NumberField = FormField<Fields, 'number'>;

type Lazy<T> = () => T;

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
    number: {
        value: NumberField['value']
        error: NumberField['error']
    },
    setSelectValue: SelectField['setValue'],
    setInputValue: InputField['setValue'],
    setCheckboxValue: CheckboxField['setValue'],
    setNumberValue: NumberField['setValue'],
    validateForm: () => void,
    isValid: Lazy<boolean>,
    values: Lazy<FormFieldsValues<Fields>>
}

const options: Option<Value>[] = [
    {value: 'ivo', text: 'Ivo'},
    {value: 'bobi', text: 'Bobi'}
];

function requireValue<V>(value: V | ''): boolean {
    return value !== '';
}

function match(input: string, values: {
    select: {
        value:  Value | ''
    }
}) : boolean {
    const { select: { value } } = values;
    return input === value;
}

function checkMin(value: number | '') {
    if(value === '') {
        return true;
    } else {
        return value >= 1;
    }
}

export const form = createForm<Fields>({
    formName: 'test',
    fields: {
        select: {
            initialValue: '',
            validation: {
                required: requireValue
            },
            condition: 'checkbox'
        },
        input: {
            initialValue: '',
            validation: {
                required: requireValue,
                match
            },
            validationDependsOn: ['select'],
            condition: 'checkbox'
        },
        checkbox: {
            initialValue: false
        },
        number: {
            initialValue: 1,
            validation: {
                required: requireValue,
                min: checkMin
            }
        }
    }
});

const App: React.FC<AppProps> = ({select, input, checkbox, number, setSelectValue, setInputValue, setCheckboxValue, setNumberValue, validateForm, isValid, values}: AppProps) => (
    <div>
        {checkbox && <Select
            id='select'
            label='Label'
            value={select.value}
            error={select.error}
            onValueChange={setSelectValue}
            notSelectedText='not selected'
            options={options} />
        }
        <Input
            id='input'
            label='Input'
            value={input.value}
            error={input.error}
            disabled={!checkbox}
            onValueChange={setInputValue} />
        <CheckboxWithLabel
            label='Checkbox'
            checked={checkbox}
            onToggle={setCheckboxValue} />
        <NumberInput
            id='number'
            label='Number'
            integer
            value={number.value}
            error={number.error}
            onValueChange={setNumberValue} />
        <Button color='primary' onClick={() => {
            if(isValid()) {
                console.log(values())
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
        number: {
            value: form.selectors.field.number.value(state),
            error: form.selectors.field.number.error(state)
        },
        isValid: () => form.selectors.form.isValid(state),
        values: () => form.selectors.form.values(state)
    }),
    {
        setSelectValue: form.actions.setValue.select,
        setInputValue: form.actions.setValue.input,
        setCheckboxValue: form.actions.setValue.checkbox,
        setNumberValue: form.actions.setValue.number,
        validateForm: form.actions.validateForm
    }
)(App);
