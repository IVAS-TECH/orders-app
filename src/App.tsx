import React from 'react';
import Select, {Option} from './components/Select';
import Input from './components/Input';
import CheckboxWithLabel from './components/CheckboxWithLabel';

type Value = 'ivo' | 'bobi';

function log<V>(value: V): void {
    console.log({value});
}

const options: Option<Value>[] = [
    {value: 'ivo', text: 'Ivo'},
    {value: 'bobi', text: 'Bobi'}
];

const App: React.FC = () => (
    <div>
        <Select<Value>
            id="select"
            label='Label'
            value='ivo'
            onValueChange={log}
            notSelectedText='not selected'
            options={options}
            error='This field is required' />
        <Input
            id="input"
            label="Input"
            value="ivo"
            onValueChange={log}
            error='This field is required' />
        <CheckboxWithLabel
            label="Checkbox"
            checked
            onToggle={() => console.log("toggle")}
        />
    </div>
);

export default App;
