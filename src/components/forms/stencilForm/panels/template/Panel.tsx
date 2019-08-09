import React, { Fragment } from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import FileField from './fields/FileField';
import FileIsFromRackelSideField from './fields/FileIsFromRackelSideField';
import CountField from './fields/CountField';
import SheetThicknessField from './fields/SheetThicknessField';

const Panel: React.FC<{}> = () => (
    <Fragment>
        <Title />
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FileField />
            </Grid>
            <Grid item xs={12}>
                <FileIsFromRackelSideField />
            </Grid>
            <Grid item xs={6}>
                <CountField />
            </Grid>
            <Grid item xs={6}>
                <SheetThicknessField />
            </Grid>
        </Grid>
    </Fragment>
);

export default Panel;