import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import GroupAddIcon from '@material-ui/icons/GroupAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextContext from './../../text/TextContext';
import OrganizationManagerForm from './../form/organizationManagerForm/Form';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(7),
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    }
}));

const CreateOrganization: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <Container component='main' maxWidth='sm'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <GroupAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <TextContext.Consumer>
                        {text => text.action.createOrganization}
                    </TextContext.Consumer>
                </Typography>
                <OrganizationManagerForm />
            </Paper>
        </Container>
    );
};

export default CreateOrganization;