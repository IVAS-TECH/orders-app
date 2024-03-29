import React from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import FidushalMarksField from './field/FidushalMarksField';
import ShowFidushalMarksOptions from './ShowFidushalMarksOptions';
import FidushalMarksKindField from './field/FidushalMarksKindField';
import FidushalMarksSideField from './field/FidushalMarksSideField';

const Panel: React.FC<{}> = () => (
    <>
        <Title />
        <FidushalMarksField />
        <ShowFidushalMarksOptions>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FidushalMarksKindField />
                </Grid>
                <Grid item xs={6}>
                    <FidushalMarksSideField />
                </Grid>
            </Grid>
        </ShowFidushalMarksOptions>
    </>
);

export default Panel;