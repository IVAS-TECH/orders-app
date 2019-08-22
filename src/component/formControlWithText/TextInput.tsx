import React from 'react';
import TextInputComp, { TextInputProps as TextInputPropsComp } from './../formControl/TextInput';
import Text from './../../text/language/Text';
import TextContext from './../../text/TextContext';

export type TextInputProps = Omit<TextInputPropsComp, 'label' | 'error'> & {
    label: (text: Text) => string,
    error?: (text: Text) => string
};

const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    ...rest
}) => (
    <TextContext.Consumer>
        {text => (
            <TextInputComp
                {...rest}
                label={label(text)}
                error={error && error(text)} />
        )}
    </TextContext.Consumer>
);

export default TextInput;