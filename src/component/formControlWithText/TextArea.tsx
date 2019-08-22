import React from 'react';
import TextAreaComp, { TextAreaProps as TextAreaPropsComp } from './../formControl/TextArea';
import Text from './../../text/language/Text';
import TextContext from './../../text/TextContext';

export type TextAreaProps = Omit<TextAreaPropsComp, 'label' | 'error' | 'helperText'> & {
    label: (text: Text) => string,
    helperText?: (text: Text) => string,
    error?: (text: Text) => string
};

const TextArea: React.FC<TextAreaProps> = ({
    label,
    helperText,
    error,
    ...rest
}) => (
    <TextContext.Consumer>
        {text => (
            <TextAreaComp
                {...rest}
                label={label(text)}
                helperText={helperText && helperText(text)}
                error={error && error(text)} />
        )}
    </TextContext.Consumer>
);

export default TextArea;