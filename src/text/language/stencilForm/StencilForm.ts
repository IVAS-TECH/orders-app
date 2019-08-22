import File from './File';
import OptionsFor from './OptionFor';
import PanelTitle from './PanelTitle';

interface StencilForm {
    file: File,
    isFromRackelSide: string,
    count: string,
    sheetThickness: string,
    fidushalMarks: string,
    fidushalMarksKind: string,
    fidushalMarksSide: string,
    modificationsRequirements: string,
    modificationsRequirementsHelperText: string,
    includeTextFromRackelSide: string,
    textFromRackelSide: string,
    includeTextFromPCBSide: string,
    textFromPCBSide: string,
    multiply: string,
    panelsCountAxis: (axis: 'X' | 'Y') => string,
    stepAxis: (axis: 'X' | 'Y') => string,
    position: string,
    imagePosition: string,
    nanoCoating: string,
    electrochemicalPolishing: string,
    optionsFor: OptionsFor,
    stencilFormTitle: string,
    panelTitle: PanelTitle
}

export default StencilForm;