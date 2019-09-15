import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Members from './Members';
import { State, selectOrganization } from './../../../store/reducer';
import { connect } from 'react-redux';
import OrganizationData from './../../../type/Organization';

interface OrganizationProps {
    organization: null | OrganizationData
}

const useStyles = makeStyles(theme => ({
    paper: {
        width: '60%',
        marginTop: theme.spacing(6),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        margin: theme.spacing(2)
    },
    textToShowWhenNoData: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6)
    }
}));

const Organization: React.FC<OrganizationProps> = ({ organization }) => {
    const classes = useStyles();
    return <Members
        paperClass={classes.paper}
        titleClass={classes.title}
        textToShowWhenNoDataClass={classes.textToShowWhenNoData}
        organization={organization} />;
};

const Page = connect(
    (state: State) => ({ organization: selectOrganization(state) })
)(Organization);

export default Page;