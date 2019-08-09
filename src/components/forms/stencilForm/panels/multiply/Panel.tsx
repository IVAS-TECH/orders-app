import React, { Fragment } from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import MultiplyField from './fields/MultiplyField';
import ShowMultiplyOptions from './ShowMultiplyOptions';
import { PanelsCountXField, PanelsCountYField } from './fields/PanelsCountAxisField';
import { StepXField, StepYField } from './fields/StepAxisField';

const Panel: React.FC<{}> = () => (
    <Fragment>
        <Title />
        <MultiplyField />
        <ShowMultiplyOptions>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <PanelsCountXField />
                </Grid>
                <Grid item xs={6}>
                    <StepXField />
                </Grid>
                <Grid item xs={6}>
                    <PanelsCountYField />
                </Grid>
                <Grid item xs={6}>
                    <StepYField />
                </Grid>
            </Grid>
        </ShowMultiplyOptions>
    </Fragment>
);

export default Panel;