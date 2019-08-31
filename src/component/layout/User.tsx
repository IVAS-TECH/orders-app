import React from 'react';
import { connect } from 'react-redux';
import { State, selectRoute } from './../../store/reducer';
import {
    ROUTE_HOME,
    ROUTE_SIGN_IN,
    ROUTE_SIGN_UP,
    ROUTE_CREATE_ORGANIZATION
} from './../../store/location/route';
import SignIn from './../page/SignIn';
import CreateOrganization from './../page/CreateOrganization';
import SignUp from './../page/SignUp';

type Page = 'signIn' | 'createOrganization' | 'signUp'; // | 'notFound' | 'noAccess';

interface UserProps {
    currentPage: Page
}

const pageToComponentMap: Record<Page, React.ReactElement> = {
    signIn: <SignIn />,
    createOrganization: <CreateOrganization />,
    signUp: <SignUp />
};

const routeToPageMap: Record<string, Page> = {
    [ROUTE_HOME]: 'signIn',
    [ROUTE_SIGN_IN]: 'signIn',
    [ROUTE_SIGN_UP]: 'signUp',
    [ROUTE_CREATE_ORGANIZATION]: 'createOrganization'
};

const User: React.FC<UserProps> = ({ currentPage }) => pageToComponentMap[currentPage];

const ConnectedUser = connect(
    (state: State) => {
        const currentRoute = selectRoute(state);
        const page = routeToPageMap[currentRoute];
        return { currentPage: page ? page : 'signIn' };
    }
)(User);

export default ConnectedUser;