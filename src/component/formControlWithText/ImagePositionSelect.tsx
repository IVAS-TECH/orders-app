import React from 'react';
import ImagePositionSelectComp, { ImagePositionSelectProps as ImagePositionSelectPropsComp } from './../formControl/ImagePositionSelect';
import Text from './../../text/language/Text';
import TextContext from './../../text/TextContext';

export type ImagePositionSelectProps = Omit<ImagePositionSelectPropsComp, 'label' | 'error'> & {
    label: (text: Text) => string,
    error?: (text: Text) => string
};

const ImagePositionSelect: React.FC<ImagePositionSelectProps> = ({
    label,
    error,
    ...rest
}) => (
    <TextContext.Consumer>
        {text => (
            <ImagePositionSelectComp
                {...rest}
                label={label(text)}
                error={error && error(text)} />
        )}
    </TextContext.Consumer>
);

export default ImagePositionSelect;