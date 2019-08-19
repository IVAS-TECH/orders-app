import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Filter from './Filter';

export interface MultiValueFilterProps {
    values: string[],
    filter: string
};

const MultiValueFilter: React.FC<MultiValueFilterProps> = ({
    values,
    filter
}) => (
    <Grid container spacing={2}>
        <Grid item>
            <Filter filter={filter} />
        </Grid>
        {values.map((value, index) => (
            <Grid item key={`${index}:${value}`}>
                <Chip label={value} size='medium' />
            </Grid>
        ))}
    </Grid>
);

export default MultiValueFilter;