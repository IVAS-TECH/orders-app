import React from 'react';
import MuiButton from '@material-ui/core/Button';
import TextContext from '../../../../text/TextContext';

interface ButtonProps {
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    className,
}) => (
    <MuiButton
        fullWidth
        variant='text'
        color='secondary'
        className={className}>
        <TextContext.Consumer>
            {text => text.form.text.forgotPassword}
        </TextContext.Consumer>
    </MuiButton>
);

export default Button;