import createForm, { FormState, FormFieldsValues } from './form/reducer';
import { RequiredStringField, RequiredSelectField, requiredField } from './form/formField/formFieldWithValueValidation/RequiredField';
import { BooleanField, booleanField } from './form/formField/formFieldWithoutValidation/BooleanField';
import { NumberFieldWithMinValue, numberFieldWithMinValue } from './form/formField/formFieldWithValueValidation/NumberFieldWithMinValue';
import { StringField, stringField } from './form/formField/formFieldWithoutValidation/StringField';
import FormFieldWithValueValidation from './form/formField/formFieldWithValueValidation/FormFieldWithValueValidation';
import * as OrderData from './../type/OrderData';
import { ROUTE_HOME, ROUTE_ORDER } from './location/route';
import { createSelector } from 'reselect';

export type SheetThickness = OrderData.SheetThickness;

export type FidushalMarksKind = OrderData.FidushalMarksKind;

export type FidushalMarksSide = OrderData.FidushalMarksSide;

export type Position = OrderData.Position;

export type ImagePosition = OrderData.ImagePosition;

type RequiredFileField = FormFieldWithValueValidation<File, null , 'required'>;

export interface Fields {
    file: RequiredFileField,
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
    file: File | { url: string },
    fileName: string,
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

export const countMin = 1;
export const stepMin = 0;

export const CREATED_ORDER = 'ivas-tech/orders-app/stencilForm/CREATED_ORDER';

export function createdOrder() {
    return { type: CREATED_ORDER };
};

const form = createForm<Fields>({
    formName: 'stencilForm',
    fields: {
        file: {
            initialValue: null,
            validation: {
                required: value => value !== null
            }
        },
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
}, [ ROUTE_HOME, ROUTE_ORDER, CREATED_ORDER ]);

export default form;

export const formData = createSelector(
    form.selectors.form.values,
    formValuesToFormData
);

function formValuesToFormData(formValues: FormFieldsValues<Fields>): null | FormData {
    const isEmpty = Object.keys(formValues).length === 0;
    return isEmpty ? null : {
        file: formValues.file!,
        fileName: formValues.file!.name,
        fileIsFromRackelSide: formValues.fileIsFromRackelSide!,
        count: formValues.count! as number,
        sheetThickness: formValues.sheetThickness!,
        fidushalMarks:  formValues.fidushalMarks!,
        fidushalMarksKind: formValues.fidushalMarksKind,
        fidushalMarksSide: formValues.fidushalMarksSide,
        modificationsRequirements: formValues.modificationsRequirements!,
        includeTextFromRackelSide: formValues.includeTextFromRackelSide!,
        textFromRackelSide: formValues.textFromRackelSide,
        includeTextFromPCBSide: formValues.includeTextFromPCBSide!,
        textFromPCBSide: formValues.textFromPCBSide,
        multiply: formValues.multiply!,
        panelsCountX: formValues.panelsCountX as number | undefined,
        stepX: formValues.stepX as number | undefined,
        panelsCountY: formValues.panelsCountY as number | undefined,
        stepY: formValues.stepY as number | undefined,
        position: formValues.position!,
        imagePosition: formValues.imagePosition!,
        nanoCoating: formValues.nanoCoating!,
        electrochemicalPolishing: formValues.electrochemicalPolishing!
    };
};