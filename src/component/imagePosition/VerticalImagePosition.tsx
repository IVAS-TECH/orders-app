import React from 'react';
import OuterBorder from './OuterBorder';
import VerticalInnerBorder from './VerticalInnerBorder';

const VerticalImagePosition: React.FC<{}> = () => (
    <OuterBorder>
        <VerticalInnerBorder />
    </OuterBorder>
);

export default VerticalImagePosition;