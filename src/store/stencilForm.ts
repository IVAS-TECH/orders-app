import createForm, { FormState } from './form/reducer';
import { RequiredStringField, RequiredSelectField, requiredField } from './form/formField/formFieldWithValueValidation/RequiredField';
import { BooleanField, booleanField } from './form/formField/formFieldWithoutValidation/BooleanField';
import { NumberFieldWithMinValue, numberFieldWithMinValue } from './form/formField/formFieldWithValueValidation/NumberFieldWithMinValue';
import { StringField, stringField } from './form/formField/formFieldWithoutValidation/StringField';

export type SheetThickness = 30 | 40 | 50 | 80 | 90 | 100 | 110 | 120 | 130 | 150 | 180 | 200 | 250 | 300;

export type FidushalMarksKind = 'graved' | 'cut';

export type FidushalMarksSide = 'pcb' | 'rackel' | 'two-sided';

export type Position = 'pcb-centered' | 'layout-centered';

export type ImagePosition = 'horizontal' | 'vertical';

export interface Fields {
    file: RequiredStringField,
    fileIsFromRackelSide: BooleanField,
    count: NumberFieldWithMinValue<1>,
    sheetThickness: RequiredSelectField<SheetThickness>,
    fidushalMarks:  BooleanField,
    fidushalMarksKind: RequiredSelectField<FidushalMarksKind>,
    fidushalMarksSide: RequiredSelectField<FidushalMarksSide>,
    modificationsRequirements: StringField,
    includeTextFromRackelSide: BooleanField,
    textFromRackelSide: RequiredStringField,
    includeTextFromPCBSide: BooleanField,
    textFromPCBSide: RequiredStringField,
    multiply: BooleanField,
    panelsCountX: NumberFieldWithMinValue<1>,
    stepX: NumberFieldWithMinValue<0>,
    panelsCountY: NumberFieldWithMinValue<1>,
    stepY: NumberFieldWithMinValue<0>,
    position: RequiredSelectField<Position>,
    imagePosition: RequiredSelectField<ImagePosition>,
    nanoCoating: BooleanField,
    electrochemicalPolishing: BooleanField
};

export type State = FormState<Fields>;

const form = createForm<Fields>({
    formName: 'stencilForm',
    fields: {
        file: requiredField(),
        fileIsFromRackelSide: booleanField(),
        count: numberFieldWithMinValue(1),
        sheetThickness: requiredField(),
        fidushalMarks: booleanField(),
        fidushalMarksKind: requiredField('fidushalMarks'),
        fidushalMarksSide: requiredField('fidushalMarks'),
        modificationsRequirements: stringField(),
        includeTextFromRackelSide: booleanField(),
        textFromRackelSide: requiredField('includeTextFromRackelSide'),
        includeTextFromPCBSide: booleanField(),
        textFromPCBSide: requiredField('includeTextFromPCBSide'),
        multiply: booleanField(),
        panelsCountX: numberFieldWithMinValue(1, 'multiply'),
        stepX: numberFieldWithMinValue(0, 'multiply'),
        panelsCountY: numberFieldWithMinValue(1, 'multiply'),
        stepY: numberFieldWithMinValue(0, 'multiply'),
        position: requiredField(),
        imagePosition: requiredField(),
        nanoCoating: booleanField(),
        electrochemicalPolishing: booleanField()
    }
});

export default form;