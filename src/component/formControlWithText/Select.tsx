import React from 'react';
import SelectComp, { SelectProps as SelectPropsComp, OptionText } from './../formControl/Select';
import Text from './../../text/language/Text';
import TextContext from './../../text/TextContext';

export type SelectProps<Value extends string | number>
= Omit<SelectPropsComp<Value>, 'label' | 'error' | 'optionText' | 'notSelectedText'>
& {
    label: (text: Text) => string,
    optionText: (text: Text) => OptionText<Value>,
    notSelectedText?: (text: Text) => string,
    error?: (text: Text) => string
};

function Select<Value extends string | number>(props: SelectProps<Value>) {
    const {
        label,
        optionText,
        notSelectedText,
        error,
        ...rest
    } = props;
    return (
        <TextContext.Consumer>
            {text => (
                <SelectComp
                    {...rest}
                    label={label(text)}
                    optionText={optionText(text)}
                    notSelectedText={notSelectedText && notSelectedText(text)}
                    error={error && error(text)} />
            )}
        </TextContext.Consumer>
    );
}

export default Select;