import React from 'react';
import MuiButton from '@material-ui/core/Button';
import TextContext from '../../../../text/TextContext';
import { connect } from 'react-redux';
import { navigateToCreateOrganization } from '../../../../store/location/route';

interface ButtonProps {
    className?: string,
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({
    className,
    onClick
}) => (
    <MuiButton
        fullWidth
        variant='text'
        color='secondary'
        className={className}
        onClick={onClick}>
        <TextContext.Consumer>
            {text => text.action.createOrganization}
        </TextContext.Consumer>
    </MuiButton>
);

const ConnectedButton = connect(
    null,
    { onClick: navigateToCreateOrganization }
)(Button);

export default ConnectedButton;