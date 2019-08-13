import React, { Fragment } from 'react';
import { ControlProps } from './FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import HorizontalImagePosition from './../imagePosition/HorizontalImagePosition';
import VerticalImagePosition from './../imagePosition/VerticalImagePosition'; 

export type Position = 'horizontal' | 'vertical';

export type Value = '' | Position;

export interface ImagePositionSelectProps extends ControlProps {
    value: Value,
    onValueChange: (value: Position) => void
};

const ImagePositionSelect: React.FC<ImagePositionSelectProps> = ({
    label,
    disabled,
    required,
    error,
    value,
    onValueChange
}) => (
    <Fragment>
        <FormLabel disabled={disabled} required={required} error={!!error}>
                    {label}
        </FormLabel>
        <Grid container direction='row' justify='space-around' alignItems='center'>
            <Grid container direction='column' item xs={6}>
                <Grid item xs={6}>
                    <Radio
                        color='primary'
                        disabled={disabled}
                        required={required}
                        checked={value === 'horizontal'}
                        onChange={() => onValueChange('horizontal')} />
                </Grid>
                <Grid item xs={6}>
                    <HorizontalImagePosition />
                </Grid>
            </Grid>
            <Grid container direction="column" item xs={6}>
                <Grid item xs={6}>
                <Radio
                        color='primary'
                        disabled={disabled}
                        required={required}
                        checked={value === 'vertical'}
                        onChange={() => onValueChange('vertical')} />
                </Grid>
                <Grid item xs={6}>
                    <VerticalImagePosition />
                </Grid>
            </Grid>
        </Grid>
        {error && <FormHelperText disabled={disabled} required={required} error={!!error}>
            {error}
        </FormHelperText>}
    </Fragment>
);

export default ImagePositionSelect;