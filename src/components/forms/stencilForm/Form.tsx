import React from 'react';
import FileField from './FileField';
import FileIsFromRackelSideField from './FileIsFromRackelSideField';
import CountField from './CountField';
import SheetThicknessField from './SheetThicknessField';
import FidushalMarksField from './FidushalMarksField';
import FidushalMarksKindField from './FidushalMarksKindField';
import FidushalMarksSideField from './FidushalMarksSideField';
import ModificationsRequirementsField from './ModificationsRequirementsField';
import IncludeTextFromRackelSideField from './IncludeTextFromRackelSideField';
import TextFromRackelSideField from './TextFromRackelSideField';
import IncludeTextFromPCBSideField from './IncludeTextFromPCBSideField';
import TextFromPCBSideField from './TextFromPCBSideField';
import MultiplyField from './MultiplyField';
import { PanelsCountXField, PanelsCountYField } from './PanelsCountAxisField';
import { StepXField, StepYField } from './StepAxisField';
import PositionField from './PositionField';
import NanoCoatingField from './NanoCoatingField';
import ElectrochemicalPolishingField from './ElectrochemicalPolishingField';

const Form: React.FC = () => (
    <div>
        <FileField />
        <FileIsFromRackelSideField />
        <CountField />
        <SheetThicknessField />
        <FidushalMarksField />
        <FidushalMarksKindField />
        <FidushalMarksSideField />
        <ModificationsRequirementsField />
        <IncludeTextFromRackelSideField />
        <TextFromRackelSideField />
        <IncludeTextFromPCBSideField />
        <TextFromPCBSideField />
        <MultiplyField />
        <PanelsCountXField />
        <StepXField />
        <PanelsCountYField />
        <StepYField />
        <PositionField />
        <NanoCoatingField />
        <ElectrochemicalPolishingField />
    </div>
);

export default Form;