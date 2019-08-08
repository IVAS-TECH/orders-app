import React from "react";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/styles';
import Name from './Name';
import LanguageSelect from './LanguageSelect';

const AppBarComponent = styled(MUIAppBar)({
    position: 'relative'
});

const AppBar: React.FC<{}> = () => (
    <AppBarComponent position="absolute" color='default'>
        <Toolbar>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                    <Name />
                </Grid>
                <Grid item>
                    <LanguageSelect />
                </Grid>
            </Grid>
        </Toolbar>
    </AppBarComponent>
);

export default AppBar;