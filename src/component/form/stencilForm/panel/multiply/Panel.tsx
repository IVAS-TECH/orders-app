import React from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import MultiplyField from './field/MultiplyField';
import ShowMultiplyOptions from './ShowMultiplyOptions';
import { PanelsCountXField, PanelsCountYField } from './field/PanelsCountAxisField';
import { StepXField, StepYField } from './field/StepAxisField';

const Panel: React.FC<{}> = () => (
    <>
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
    </>
);

export default Panel;