export default interface Language {
    language: {
        bg: string,
        en: string,
        language: string
    },
    forms: {
        stencilForm: {
            filesArchive: string,
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
            nanoCoating: string,
            electrochemicalPolishing: string,
            options: {
                graved: string,
                cut: string,
                pcbSide: string,
                rackelSide: string,
                twoSided: string,
                pcbCentered: string,
                layoutCentered: string
            }
        },
        notSelected: (subjec: 'he' | 'she' | 'it') => string,
        fieldError: {
            required: string,
            min: (min: number) => string
        }
    }
}