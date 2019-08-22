import React from 'react';
import CheckboxWithLabelComp, { CheckboxWithLabelProps as CheckboxWithLabelPropsComp } from './../formControl/CheckboxWithLabel';
import Text from './../../text/language/Text';
import TextContext from './../../text/TextContext';

export type CheckboxWithLabelProps = Omit<CheckboxWithLabelPropsComp, 'label'> & {
    label: (text: Text) => string
};

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
    label,
    ...rest
}) => (
    <TextContext.Consumer>
        {text => (
            <CheckboxWithLabelComp {...rest} label={label(text)} />
        )}
    </TextContext.Consumer>
);

export default CheckboxWithLabel;