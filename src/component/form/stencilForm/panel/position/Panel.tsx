import React, { Fragment } from 'react';
import Title from './Title';
import PostionField from './field/PositionField';
import ImagePositionField from './field/ImagePositionField';
import Grid from '@material-ui/core/Grid';

const Panel: React.FC<{}> = () => (
    <Fragment>
        <Title />
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <PostionField />
            </Grid>
            <Grid item xs={6}>
                <ImagePositionField />
            </Grid>
        </Grid>
    </Fragment>
);

export default Panel;