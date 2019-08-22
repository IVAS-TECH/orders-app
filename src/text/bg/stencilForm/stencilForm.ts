import StencilForm from './../../language/stencilForm/StencilForm';
import file from './file';
import optionsFor from './optionsFor';
import panelTitle from './panelTitle';

const stencilForm: StencilForm = {
    file,
    isFromRackelSide: 'Файлът е изглед от страна ракел',
    count: 'Брой',
    sheetThickness: 'Дебелина на листа',
    fidushalMarks: 'Добави Фидюшал марки',
    fidushalMarksKind: 'Вид на марките',
    fidushalMarksSide: 'Страна на марките',
    modificationsRequirements: 'Изисквания',
    modificationsRequirementsHelperText: 'Моля, опишете всички изисквания за модификации на апертурите и позиционирането на образа',
    includeTextFromRackelSide: 'Добави текст от страната на ракела',
    textFromRackelSide: 'Текст страна ракел (rackel)',
    includeTextFromPCBSide: 'Добави текст от страната на платката',
    textFromPCBSide: 'Текст страна платка (pcb)',
    multiply: 'Добави мултиплициране',
    panelsCountAxis: axis => `Брой панели по ${axis}`,
    stepAxis: axis => `Стъпка по ${axis} (mm)`,
    position: 'Позициониране',
    imagePosition: 'Позициониране на образа върху шаблона',
    nanoCoating: 'Нанопокритие',
    electrochemicalPolishing: 'Електрохимично полиране',
    optionsFor,
    stencilFormTitle: 'Форма за поръчка на SMT стенсили',
    panelTitle
};

export default stencilForm;