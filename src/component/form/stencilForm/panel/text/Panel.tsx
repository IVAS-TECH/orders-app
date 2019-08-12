import React, { Fragment } from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import IncludeTextFromRackelSideField from './field/IncludeTextFromRackelSideField';
import TextFromRackelSideField from './field/TextFromRackelSideField';
import IncludeTextFromPCBSideField from './field/IncludeTextFromPCBSideField';
import TextFromPCBSideField from './field/TextFromPCBSideField';

const Panel: React.FC<{}> = () => (
    <Fragment>
        <Title />
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <IncludeTextFromRackelSideField />
            </Grid>
            <Grid item xs={8}>
                <TextFromRackelSideField />
            </Grid>
            <Grid item xs={4}>
                <IncludeTextFromPCBSideField />
            </Grid>
            <Grid item xs={8}>
                <TextFromPCBSideField />
            </Grid>
        </Grid>
    </Fragment>
);

export default Panel;