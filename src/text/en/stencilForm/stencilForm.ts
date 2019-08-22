import StencilForm from './../../language/stencilForm/StencilForm';
import file from './file';
import optionsFor from './optionsFor';
import panelTitle from './panelTitle';

const stencilForm: StencilForm = {
    file,
    isFromRackelSide: 'Is file with side from Rackel side',
    count: 'Count',
    sheetThickness: 'Sheet thickness',
    fidushalMarks: 'Add fidushal marks',
    fidushalMarksKind: 'Marks kind',
    fidushalMarksSide: 'Marks side',
    modificationsRequirements: 'Modification requirements',
    modificationsRequirementsHelperText: 'Please do describe all requirements for apertures modification and image positioning',
    includeTextFromRackelSide: 'Add text from Rackel side',
    textFromRackelSide: 'Rackel side text',
    includeTextFromPCBSide: 'Add text from PCB side',
    textFromPCBSide: 'PCB side text',
    multiply: 'Add multiply',
    panelsCountAxis: axis => `Panel count at ${axis}`,
    stepAxis: axis => `${axis} step (mm)`,
    position: 'Position',
    imagePosition: 'Image position on template',
    nanoCoating: 'Nano coating',
    electrochemicalPolishing: 'Electrochemical polishing',
    optionsFor,
    stencilFormTitle: 'Order form for SMT stencils',
    panelTitle
};

export default stencilForm;