import React, { Fragment } from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import IncludeTextFromRackelSideField from './fields/IncludeTextFromRackelSideField';
import TextFromRackelSideField from './fields/TextFromRackelSideField';
import IncludeTextFromPCBSideField from './fields/IncludeTextFromPCBSideField';
import TextFromPCBSideField from './fields/TextFromPCBSideField';

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