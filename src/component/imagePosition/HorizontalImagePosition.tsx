import React from 'react';
import OuterBorder from './OuterBorder';
import HorizontalInnerBorder from './HorizontalInnerBorder';

const HorizontalImagePosition: React.FC<{}> = () => (
    <OuterBorder>
        <HorizontalInnerBorder />
    </OuterBorder>
);

export default HorizontalImagePosition;