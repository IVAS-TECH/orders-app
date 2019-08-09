import React, { Fragment } from 'react';
import Title from './Title';
import PostionField from './PositionField';

const Panel: React.FC<{}> = () => (
    <Fragment>
        <Title />
        <PostionField />
    </Fragment>
);

export default Panel;