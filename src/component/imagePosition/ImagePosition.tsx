import React from 'react';
import HorizontalImagePosition from './HorizontalImagePosition';
import VerticalImagePosition from './VerticalImagePosition';
import { ImagePosition as ImagePositionValue } from './../../type/OrderData';

const ImagePosition : React.FC<{ position: ImagePositionValue }> = ({
    position
}) => position === 'horizontal'
    ? <HorizontalImagePosition />
    : <VerticalImagePosition />

export default ImagePosition;