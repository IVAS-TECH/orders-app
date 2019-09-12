import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MultiValueFilter from './MultiValueFilter';
import SingleValueFilter from './SingleValueFilter';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FilterListIconWithLeftMargin from './../FilterListIconWithLeftMargin';
import OrderStatus from '../../../../../type/OrderStatus';
import TextContext from './../../../../../text/TextContext';
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
    status: OrderStatus[],
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
    <TextContext.Consumer>
        {text => (
            <>
                <Typography variant="h5" align="center" gutterBottom>
                    {text.selectedOrdersSearchFilters}
                </Typography>
                <Grid container direction='column' spacing={4}>
                    <Grid item>
                        <SingleValueFilter
                            filter={text.orderFilter.dateInterval}
                            value={dateRange} />
                    </Grid>
                    <Divider />
                    <Grid item>
                        <MultiValueFilter
                            filter={text.orderFilter.orderStatus}
                            values={status.map(key => text.orderStatus[key])} />
                    </Grid>
                    <Divider />
                    <Grid item>
                        <MultiValueFilter
                            filter={text.orderFilter.orderedBy}
                            values={orderedBy} />
                    </Grid>
                    <Divider />
                    <Grid item>
                        <MultiValueFilter
                            filter={text.orderFilter.fileExtention}
                            values={fileExtention} />
                    </Grid>
                    <Divider />
                    <Grid item>
                        <SingleValueFilter
                            filter={text.orderFilter.fileName}
                            value={fileName} />
                    </Grid>
                    <Divider />
                    <Grid container justify='flex-end' item>
                        <Button variant='contained' color='primary' size='large' onClick={onRequestChangeFilters}>
                            {text.action.changeFilters}
                            <FilterListIconWithLeftMargin />
                        </Button>
                    </Grid>
                </Grid>
            </>
        )}
    </TextContext.Consumer>
);

const CurrentFilters = connect(
    (state: State) => {
        const currentOrderFilter = selectCurrentOrderFilter(state);
        return {
            dateRange: selectDateRange(currentOrderFilter),
            status: selectPickedFromStatus(currentOrderFilter),
            orderedBy: selectPickedFromOrderedBy(currentOrderFilter),
            fileExtention: selectPickedFromFileExtention(currentOrderFilter) as string[],
            fileName: selectFileName(currentOrderFilter)
        };
    }, {
        onRequestChangeFilters: resetFilterStep
    }
)(CurrentOrderFilters);

export default CurrentFilters;