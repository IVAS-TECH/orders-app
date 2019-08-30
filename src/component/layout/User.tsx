import React from 'react';
import { connect } from 'react-redux';
import { State, selectRoute } from './../../store/reducer';
import {
    ROUTE_SIGN_IN,
    ROUTE_CREATE_ORGANIZATION
} from './../../store/location/route';
import SignIn from './../page/SignIn';
import CreateOrganization from './../page/CreateOrganization';

type Page = 'signIn' | 'createOrganization'; // | 'singUp'  | 'notFound' | 'noAccess';

interface UserProps {
    currentPage: Page
}

const pageToComponentMap: Record<Page, React.ReactElement> = {
    signIn: <SignIn />,
    createOrganization: <CreateOrganization />
};

const routeToPageMap: Record<string, Page> = {
    [ROUTE_SIGN_IN]: 'signIn' as 'signIn',
    [ROUTE_CREATE_ORGANIZATION]: 'createOrganization' as 'createOrganization'
}

const User: React.FC<UserProps> = ({ currentPage }) => pageToComponentMap[currentPage];

const ConnectedUser = connect(
    (state: State) => {
        const currentRoute = selectRoute(state);
        const page = routeToPageMap[currentRoute];
        return { currentPage: page ? page : 'signIn' };
    }
)(User);

export default ConnectedUser;