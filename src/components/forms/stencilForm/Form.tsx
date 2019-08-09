import React from 'react';
import PanelDivider from './../layout/PanelDivider';
import TemplatePanel from './panels/template/Panel';
import FidushalMarksPanel from './panels/fidushalMarks/Panel';
import ModificationsRequirementsPanel from './panels/modificationsRequirements/Panel';
import TextPanel from './panels/text/Panel';
import MultiplyPanel from './panels/multiply/Panel';
import PositionPanel from './panels/position/Panel';
import AdditionalProcessingPanel from './panels/additionalProcessing/Panel';

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