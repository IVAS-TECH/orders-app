import React from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import FileField from './field/FileField';
import FileIsFromRackelSideField from './field/FileIsFromRackelSideField';
import CountField from './field/CountField';
import SheetThicknessField from './field/SheetThicknessField';

const Panel: React.FC<{}> = () => (
    <>
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
    </>
);

export default Panel;