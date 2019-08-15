import React, { Fragment } from 'react';
import PanelDivider from '../layout/PanelDivider';
import TemplatePanel from './panel/template/Panel';
import FidushalMarksPanel from './panel/fidushalMarks/Panel';
import ModificationsRequirementsPanel from './panel/modificationsRequirements/Panel';
import TextPanel from './panel/text/Panel';
import MultiplyPanel from './panel/multiply/Panel';
import PositionPanel from './panel/position/Panel';
import AdditionalProcessingPanel from './panel/additionalProcessing/Panel';
import styled from '@material-ui/styles/styled';
import DivWithClassName from './../../DivWithClassName';
import PreviewOrderButton from './PreviewOrderButton';
import FormIsInvalidWarning from './FormIsInvalidWarning';
import PreviewOrder from './PreviewOrder';

const PreviewOrderButtonOuter = styled(DivWithClassName)({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 42
});

const Form: React.FC = () => (
    <Fragment>
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
            <PanelDivider />
            <PreviewOrderButtonOuter>
                <PreviewOrderButton />
            </PreviewOrderButtonOuter>
        </form>
        <FormIsInvalidWarning />
        <PreviewOrder />
    </Fragment>
);

export default Form;