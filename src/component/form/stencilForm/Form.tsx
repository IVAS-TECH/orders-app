import React from 'react';
import PanelDivider from '../layout/PanelDivider';
import TemplatePanel from './panel/template/Panel';
import FidushalMarksPanel from './panel/fidushalMarks/Panel';
import ModificationsRequirementsPanel from './panel/modificationsRequirements/Panel';
import TextPanel from './panel/text/Panel';
import MultiplyPanel from './panel/multiply/Panel';
import PositionPanel from './panel/position/Panel';
import AdditionalProcessingPanel from './panel/additionalProcessing/Panel';

const Form: React.FC = () => (
    <form>
        <TemplatePanel />
        <PanelDivider />
        <FidushalMarksPanel />
        <PanelDivider />
        <ModificationsRequirementsPanel />
        <PanelDivider />
        <TextPanel />
        <PanelDivider />
        <MultiplyPanel />
        <PanelDivider />
        <PositionPanel />
        <PanelDivider />
        <AdditionalProcessingPanel />
    </form>
);

export default Form;