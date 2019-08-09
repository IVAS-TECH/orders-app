import React, { Fragment } from 'react';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import FidushalMarksField from './fields/FidushalMarksField';
import ShowFidushalMarksOptions from './ShowFidushalMarksOptions';
import FidushalMarksKindField from './fields/FidushalMarksKindField';
import FidushalMarksSideField from './fields/FidushalMarksSideField';

const Panel: React.FC<{}> = () => (
    <Fragment>
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
    </Fragment>
);

export default Panel;