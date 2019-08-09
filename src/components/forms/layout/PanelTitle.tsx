import React from 'react';
import Typography from "@material-ui/core/Typography";

const PanelTitle: React.FC<{title: string}> = ({ title }) => (
    <Typography variant="h6" gutterBottom>
        {title}
    </Typography>
);

export default PanelTitle;