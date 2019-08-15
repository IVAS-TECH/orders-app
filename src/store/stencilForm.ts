import createForm, { FormState, FormFieldsValues } from './form/reducer';
import { RequiredStringField, RequiredSelectField, requiredField } from './form/formField/formFieldWithValueValidation/RequiredField';
import { BooleanField, booleanField } from './form/formField/formFieldWithoutValidation/BooleanField';
import { NumberFieldWithMinValue, numberFieldWithMinValue } from './form/formField/formFieldWithValueValidation/NumberFieldWithMinValue';
import { StringField, stringField } from './form/formField/formFieldWithoutValidation/StringField';
import * as StencilData from './../type/StencilData';

export type SheetThickness = StencilData.SheetThickness;

export type FidushalMarksKind = StencilData.FidushalMarksKind;

export type FidushalMarksSide = StencilData.FidushalMarksSide;

export type Position = StencilData.Position;

export type ImagePosition = StencilData.ImagePosition;

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

export type FormValues = FormFieldsValues<Fields>;

export type FormData = {
    file: string,
    fileIsFromRackelSide: boolean,
    count: number,
    sheetThickness: SheetThickness,
    fidushalMarks:  boolean,
    fidushalMarksKind?: FidushalMarksKind,
    fidushalMarksSide?: FidushalMarksSide,
    modificationsRequirements: string,
    includeTextFromRackelSide: boolean,
    textFromRackelSide?: string,
    includeTextFromPCBSide: boolean,
    textFromPCBSide?: string,
    multiply: boolean,
    panelsCountX?: number,
    stepX?: number,
    panelsCountY?: number,
    stepY?: number,
    position: Position,
    imagePosition: ImagePosition,
    nanoCoating: boolean,
    electrochemicalPolishing: boolean
};

const countMin = 1;

const stepMin = 0;

const form = createForm<Fields>({
    formName: 'stencilForm',
    fields: {
        file: requiredField(),
        fileIsFromRackelSide: booleanField(),
        count: numberFieldWithMinValue(countMin),
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
        panelsCountX: numberFieldWithMinValue(countMin, 'multiply'),
        stepX: numberFieldWithMinValue(stepMin, 'multiply'),
        panelsCountY: numberFieldWithMinValue(countMin, 'multiply'),
        stepY: numberFieldWithMinValue(stepMin, 'multiply'),
        position: requiredField(),
        imagePosition: requiredField(),
        nanoCoating: booleanField(),
        electrochemicalPolishing: booleanField()
    }
});

export function formData(formState: State): null | FormData {
    const formValues = form.selectors.form.values(formState);
    const isEmpty = Object.keys(formValues).length === 0;
    return isEmpty ? null : formValues as FormData;
};

export default form;

export { countMin, stepMin };