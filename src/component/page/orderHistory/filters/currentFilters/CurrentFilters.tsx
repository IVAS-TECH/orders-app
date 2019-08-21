import React from 'react';
import Grid from '@material-ui/core/Grid';
import MultiValueFilter from './MultiValueFilter';
import SingleValueFilter from './SingleValueFilter';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FilterListIconWithLeftMargin from './../FilterListIconWithLeftMargin';
import { connect } from 'react-redux';
import { State, selectCurrentOrderFilter } from './../../../../../store/reducer';
import {
    selectDateRange,
    selectPickedFromStatus,
    selectPickedFromOrderedBy,
    selectPickedFromFileExtention,
    selectFileName
} from './../../../../../store/orderFilter/orderFilter';
import { resetFilterStep } from '../../../../../store/orderFilter/setOrderFilter/orderFilter';

interface CurrentOrderFilterProps {
    dateRange: string,
    status: string[],
    orderedBy: string[],
    fileExtention: string[],
    fileName: string,
    onRequestChangeFilters: () => void
}

const CurrentOrderFilters: React.FC<CurrentOrderFilterProps> = ({
    dateRange,
    status,
    orderedBy,
    fileExtention,
    fileName,
    onRequestChangeFilters
}) => (
    <Grid container direction='column' spacing={4}>
        <Grid item>
            <SingleValueFilter
                filter='Date'
                value={dateRange} />
        </Grid>
        <Divider />
        <Grid item>
            <MultiValueFilter
                filter='Status'
                values={status} />
        </Grid>
        <Divider />
        <Grid item>
            <MultiValueFilter
                filter='Ordered by'
                values={orderedBy} />
        </Grid>
        <Divider />
        <Grid item>
            <MultiValueFilter
                filter='File extention'
                values={fileExtention} />
        </Grid>
        <Divider />
        <Grid item>
            <SingleValueFilter
                filter='File name'
                value={fileName} />
        </Grid>
        <Divider />
        <Grid container justify='flex-end' item>
            <Button variant='contained' color='primary' size='large' onClick={onRequestChangeFilters}>
                Change filters
                <FilterListIconWithLeftMargin />
            </Button>
        </Grid>
    </Grid>
);

const CurrentFilters = connect(
    (state: State) => {
        const currentOrderFilter = selectCurrentOrderFilter(state);
        return {
            dateRange: selectDateRange(currentOrderFilter),
            status: selectPickedFromStatus(currentOrderFilter) as string[],
            orderedBy: selectPickedFromOrderedBy(currentOrderFilter),
            fileExtention: selectPickedFromFileExtention(currentOrderFilter) as string[],
            fileName: selectFileName(currentOrderFilter)
        };
    }, {
        onRequestChangeFilters: resetFilterStep
    }
)(CurrentOrderFilters);

export default CurrentFilters;