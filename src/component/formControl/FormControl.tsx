import React from 'react';
import MuiFormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export interface ControlProps {
    label: string,
    disabled?: boolean,
    required?: boolean,
    error?: string
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
    children
}) => (
    <MuiFormControl
        required={required}
        disabled={disabled}
        error={!!error}
        variant='filled'
        fullWidth>
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