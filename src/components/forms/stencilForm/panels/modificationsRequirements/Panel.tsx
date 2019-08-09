import React, { Fragment } from 'react';
import Title from './Title';
import ModificationsRequirementsField from './ModificationsRequirementsField';

const Panel: React.FC<{}> = () => (
    <Fragment>
        <Title />
        <ModificationsRequirementsField />
    </Fragment>
);

export default Panel;