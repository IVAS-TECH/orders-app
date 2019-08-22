import React from 'react';
import Typography from "@material-ui/core/Typography";
import Text from './../../../text/language/Text';
import TextContext from './../../../text/TextContext';

export interface PanelTitleProps {
    title: (text: Text) => string
}

const PanelTitle: React.FC<PanelTitleProps> = ({ title }) => (
    <TextContext.Consumer>
        {langguage => (
            <Typography variant="h6" gutterBottom>
                {title(langguage)}
            </Typography>
        )}
    </TextContext.Consumer>
);

export default PanelTitle;