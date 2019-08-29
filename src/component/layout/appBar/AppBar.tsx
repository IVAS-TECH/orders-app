import React from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/styles';
import AppName from './AppName';
import LanguageSelect from './LanguageSelect';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { State, selectUser } from './../../../store/reducer';
import { selectUserName } from './../../../store/user';
import { logout } from './../../../store/user';
import TextContext from './../../../text/TextContext';

export interface AppBarProps {
    userName: string,
    logout: () => void
};

const AppBarComponent = styled(MuiAppBar)({
    position: 'relative'
});

const AppBar: React.FC<AppBarProps> = ({ userName, logout }) => (
    <AppBarComponent position="absolute" color='default'>
        <Toolbar>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                    <AppName />
                </Grid>
                <Grid item xs container direction='row' spacing={5} justify='flex-end' alignItems='center' >
                    <Grid item>
                        <LanguageSelect />
                    </Grid>
                    {userName !== ''  && <React.Fragment>
                        <Grid item>
                            <Typography variant='h6'>
                                {userName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button color='secondary' variant='outlined' onClick={logout}>
                                <TextContext.Consumer>
                                    {text => text.action.signOut}
                                </TextContext.Consumer>
                            </Button>
                        </Grid>
                    </React.Fragment>}            
                </Grid>
            </Grid>
        </Toolbar>
    </AppBarComponent>
);

const ConnectedAppBar = connect(
    (state: State) => ({ userName: selectUserName(selectUser(state)) }),
    { logout }
)(AppBar);

export default ConnectedAppBar;