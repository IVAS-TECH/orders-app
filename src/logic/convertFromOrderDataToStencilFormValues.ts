import { FormValues } from '../store/stencilForm';
import { OrderData } from '../type/OrderData';

export default function convert(orderData: OrderData): FormValues {
    const formValues: FormValues = {
        file: orderData.file,
        fileIsFromRackelSide: orderData.fileIsFromRackelSide,
        count: orderData.count,
        sheetThickness: orderData.sheetThickness,
        position: orderData.position,
        imagePosition: orderData.imagePosition,
        nanoCoating: orderData.nanoCoating,
        electrochemicalPolishing: orderData.electrochemicalPolishing
    };
    if(orderData.fidushalMarks) {
        const { kind, side } = orderData.fidushalMarks;
        formValues.fidushalMarks = true;
        formValues.fidushalMarksKind = kind;
        formValues.fidushalMarksSide = side;
    }
    if(orderData.modificationsRequirements) {
        formValues.modificationsRequirements = orderData.modificationsRequirements;
    }
    if(orderData.text) {
        const { rackelSide, pcbSide } = orderData.text;
        if(rackelSide) {
            formValues.includeTextFromRackelSide = true;
            formValues.textFromRackelSide = rackelSide;
        }
        if(pcbSide) {
            formValues.includeTextFromPCBSide = true;
            formValues.textFromPCBSide = pcbSide;
        }
    }
    if(orderData.multiply) {
        const { x, y } = orderData.multiply;
        formValues.multiply = true;
        formValues.panelsCountX = x.panelsCount;
        formValues.stepX = x.step;
        formValues.panelsCountY = y.panelsCount;
        formValues.stepY = y.step;
    }
    return formValues;
};