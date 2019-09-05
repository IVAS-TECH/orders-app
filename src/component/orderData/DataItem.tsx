import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export type DataItemProps = {
    description: string
} & ({
    value: string | number,
    item?: undefined
} | {
    value?: undefined,
    item: React.ReactNode
});

const DataItem : React.FC<DataItemProps> = ({
    description,
    value,
    item
}) => (
    <Grid container alignContent='space-between' alignItems='baseline' justify='space-between' spacing={2} >
        <Grid item xs>
            <Typography
                align='left'
                color='textPrimary' >
                {description}:
            </Typography>
        </Grid>
        {value !== undefined
        ?
            <Grid item xs>
                <Typography align='right' color='textPrimary'>
                    {value} 
                </Typography>
            </Grid>
        :
            <Grid container alignContent='center' justify='flex-end' item xs>
                <Grid item>
                    {item}
                </Grid>
            </Grid>
        }
    </Grid>
);

export default DataItem;