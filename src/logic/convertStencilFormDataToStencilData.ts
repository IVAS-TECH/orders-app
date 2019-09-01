import { FormData } from './../store/stencilForm';
import { StencilData } from './../type/StencilData';

export default function convert(formData: FormData): StencilData {
    const stencilData: StencilData = {
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
        stencilData.fidushalMarks = {
            kind: formData.fidushalMarksKind!,
            side: formData.fidushalMarksSide!
        };
    }
    if(formData.modificationsRequirements !== '') {
        stencilData.modificationsRequirements = formData.modificationsRequirements;
    }
    if(text) {
        stencilData.text = text;
    }
    if(formData.multiply) {
        stencilData.multiply = {
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
    return stencilData;
}

function extractText(formData: FormData): StencilData['text'] {
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