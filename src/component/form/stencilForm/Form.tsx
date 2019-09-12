import React from 'react';
import PanelDivider from '../layout/PanelDivider';
import TemplatePanel from './panel/template/Panel';
import FidushalMarksPanel from './panel/fidushalMarks/Panel';
import ModificationsRequirementsPanel from './panel/modificationsRequirements/Panel';
import TextPanel from './panel/text/Panel';
import MultiplyPanel from './panel/multiply/Panel';
import PositionPanel from './panel/position/Panel';
import AdditionalProcessingPanel from './panel/additionalProcessing/Panel';
import { styled } from '@material-ui/styles';
import DivWithClassName from './../../DivWithClassName';
import PreviewOrderButton from './PreviewOrderButton';
import PreviewOrder from './PreviewOrder';

const PreviewOrderButtonOuter = styled(DivWithClassName)({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 42
});

const Form: React.FC = () => (
    <>
        <form noValidate>
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
            <PanelDivider />
            <PreviewOrderButtonOuter>
                <PreviewOrderButton />
            </PreviewOrderButtonOuter>
        </form>
        <PreviewOrder />
    </>
);

export default Form;