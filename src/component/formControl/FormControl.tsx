import React from 'react';
import MuiFormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export interface ControlProps {
    label: string,
    disabled?: boolean,
    required?: boolean,
    error?: string,
    margin?: boolean
};

export interface FormControlProps extends ControlProps {
    labelFor: string,
    shrinkLabel?: boolean
}

const FormControl: React.FC<FormControlProps> = ({
    label,
    disabled,
    required,
    error,
    labelFor,
    shrinkLabel,
    margin,
    children
}) => (
    <MuiFormControl
        required={required}
        disabled={disabled}
        error={!!error}
        variant='filled'
        fullWidth
        margin={margin ? 'normal' : 'dense'}>
        <InputLabel htmlFor={labelFor} shrink={shrinkLabel}>
            {label}
        </InputLabel>
        {children}
        {error && 
            <FormHelperText>
                {error}
            </FormHelperText>}
    </MuiFormControl>
);

export default FormControl;