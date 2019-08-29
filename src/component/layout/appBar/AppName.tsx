import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

const AppName: React.FC<{}> = () => (
    <Grid container direction='row' spacing={4} justify='space-around' alignItems='center'>
        <Grid item>
            <Typography component='span' variant='h4' color='primary' noWrap>
                IVAS
            </Typography>
            <Typography component='span' variant='h4' color='inherit' noWrap>
                -
            </Typography>
            <Typography component='span' variant='h4' color='secondary' noWrap>
                TECH
            </Typography>
        </Grid>
        <Grid item>
            <Typography component='span' variant='h4' color='inherit' noWrap>
                Orders App
            </Typography>
        </Grid>
    </Grid>
);

export default AppName;

