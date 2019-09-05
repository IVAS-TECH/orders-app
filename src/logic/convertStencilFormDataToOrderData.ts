import { FormData } from '../store/stencilForm';
import { OrderData } from '../type/OrderData';

export default function convert(formData: FormData): OrderData {
    const orderData: OrderData = {
        file: formData.file,
        fileName: formData.fileName,
        fileIsFromRackelSide: formData.fileIsFromRackelSide,
        count: formData.count,
        sheetThickness: formData.sheetThickness,
        position: formData.position,
        imagePosition: formData.imagePosition,
        nanoCoating: formData.nanoCoating,
        electrochemicalPolishing: formData.electrochemicalPolishing
    };
    const text = extractText(formData);
    if(formData.fidushalMarks) {
        orderData.fidushalMarks = {
            kind: formData.fidushalMarksKind!,
            side: formData.fidushalMarksSide!
        };
    }
    if(formData.modificationsRequirements !== '') {
        orderData.modificationsRequirements = formData.modificationsRequirements;
    }
    if(text) {
        orderData.text = text;
    }
    if(formData.multiply) {
        orderData.multiply = {
            x: {
                panelsCount: formData.panelsCountX!,
                step: formData.stepX!
            },
            y: {
                panelsCount: formData.panelsCountY!,
                step: formData.stepY!
            }
        };
    }
    return orderData;
}

function extractText(formData: FormData): OrderData['text'] {
    if(formData.includeTextFromRackelSide && formData.includeTextFromPCBSide) {
        return {
            rackelSide: formData.textFromRackelSide!,
            pcbSide: formData.textFromPCBSide!
        }
    }
    if(formData.includeTextFromRackelSide) {
        return { rackelSide: formData.textFromRackelSide! };
    }
    if(formData.includeTextFromPCBSide) {
        return { pcbSide: formData.textFromPCBSide! }
    }
    return undefined;
}