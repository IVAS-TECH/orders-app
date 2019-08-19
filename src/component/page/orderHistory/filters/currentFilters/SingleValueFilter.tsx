import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Filter from './Filter';

export interface SingleValueFilterProps {
    value: string,
    filter: string
};

const SingleValueFilter: React.FC<SingleValueFilterProps> = ({
    value,
    filter
}) => (
    <Grid container spacing={2}>
        <Grid item>
            <Filter filter={filter} />
        </Grid>
        {value !== '' && <Grid item>
            <Chip label={value} size='medium' />
        </Grid>}
    </Grid>
);

export default SingleValueFilter;