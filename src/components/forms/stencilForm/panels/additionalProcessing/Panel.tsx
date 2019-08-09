import React, { Fragment } from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import NanoCoatingField from './fields/NanoCoatingField';
import ElectrochemicalPolishingField from './fields/ElectrochemicalPolishingField';;

const Panel: React.FC<{}> = () => (
    <Fragment>
        <Title />
        <Grid container>
            <Grid item xs={6}>
                <NanoCoatingField />
            </Grid>
            <Grid item xs={6}>
                <ElectrochemicalPolishingField />
            </Grid>
        </Grid>
    </Fragment>
);

export default Panel;