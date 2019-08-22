import React from 'react';
import NumberInputComp, { NumberInputProps as NumberInputPropsComp } from './../formControl/NumberInput';
import Text from './../../text/language/Text';
import TextContext from './../../text/TextContext';

export type NumberInputProps = Omit<NumberInputPropsComp, 'label' | 'error'> & {
    label: (text: Text) => string,
    error?: (text: Text) => string
};

const NumberInput: React.FC<NumberInputProps> = ({
    label,
    error,
    ...rest
}) => (
    <TextContext.Consumer>
        {text => (
            <NumberInputComp
                {...rest}
                label={label(text)}
                error={error && error(text)} />
        )}
    </TextContext.Consumer>
);

export default NumberInput;