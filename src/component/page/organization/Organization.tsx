import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Members from './Members';
import { State, selectOrganization, selectUser } from './../../../store/reducer';
import { selectUserRole } from './../../../store/user';
import { openInviteToOrganization } from './../../../store/inviteToOrganization/showInviteToOrganization';
import { connect } from 'react-redux';
import OrganizationData from './../../../type/Organization';
import TextContext from './../../../text/TextContext';
import ShowInviteToOrganization from './../../dialog/inviteToOrganization/ShowInviteToOrganization';

interface OrganizationProps {
    organization: null | OrganizationData,
    isOrganizationManager: boolean,
    openInviteToOrganization: () => void
}

const useStyles = makeStyles(theme => ({
    paper: {
        width: '60%',
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        margin: theme.spacing(2)
    },
    textToShowWhenNoData: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6)
    },
    inviteButtonWrap: {
        width: '18%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6),
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const Organization: React.FC<OrganizationProps> = ({
    organization,
    isOrganizationManager,
    openInviteToOrganization
}) => {
    const classes = useStyles();
    return (
        <main>
            <Members
                paperClass={classes.paper}
                titleClass={classes.title}
                textToShowWhenNoDataClass={classes.textToShowWhenNoData}
                organization={organization} />
            {isOrganizationManager && <>
                <div className={classes.inviteButtonWrap}>
                    <Button
                        disabled={organization === null}
                        variant='contained'
                        color='primary'
                        onClick={openInviteToOrganization}>
                        <TextContext.Consumer>
                            {text => text.action.inviteToOrganization}
                        </TextContext.Consumer>
                    </Button>
                </div>
                <ShowInviteToOrganization />
            </>}
        </main>
    );
};

const Page = connect(
    (state: State) => ({
        organization: selectOrganization(state),
        isOrganizationManager: selectUserRole(selectUser(state)) === 'organizationManager'
    }), {
        openInviteToOrganization
    }
)(Organization);

export default Page;