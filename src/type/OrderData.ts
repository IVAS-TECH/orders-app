import ServerFile from './ServerFile';

export type SheetThickness = 30 | 40 | 50 | 80 | 90 | 100 | 110 | 120 | 130 | 150 | 180 | 200 | 250 | 300;

export type FidushalMarksKind = 'graved' | 'cut';

export type FidushalMarksSide = 'pcb' | 'rackel' | 'two-sided';

export type Position = 'pcb-centered' | 'layout-centered';

export type ImagePosition = 'horizontal' | 'vertical';

export interface MultiplyOnAxis {
    panelsCount: number,
    step: number
};

export interface OrderData {
    file: File | ServerFile,
    fileName: string,
    fileIsFromRackelSide: boolean,
    count: number,
    sheetThickness: SheetThickness,
    fidushalMarks?: {
        kind: FidushalMarksKind,
        side: FidushalMarksSide
    },
    modificationsRequirements?: string,
    text?: {
        rackelSide: string,
        pcbSide?: string
    } | {
        rackelSide?: string
        pcbSide: string
    },
    multiply?: {
        x: MultiplyOnAxis,
        y: MultiplyOnAxis
    },
    position: Position,
    imagePosition: ImagePosition,
    nanoCoating: boolean,
    electrochemicalPolishing: boolean
};