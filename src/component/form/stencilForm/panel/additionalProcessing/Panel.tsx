import React from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import NanoCoatingField from './field/NanoCoatingField';
import ElectrochemicalPolishingField from './field/ElectrochemicalPolishingField';;

const Panel: React.FC<{}> = () => (
    <>
        <Title />
        <Grid container>
            <Grid item xs={6}>
                <NanoCoatingField />
            </Grid>
            <Grid item xs={6}>
                <ElectrochemicalPolishingField />
            </Grid>
        </Grid>
    </>
);

export default Panel;