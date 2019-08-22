import {
    FidushalMarksKind,
    FidushalMarksSide,
    Position
} from './../../../type/StencilData';

interface OptionsFor {
    fidushalMarksKind: {
        [Key in FidushalMarksKind]: string
    },
    fidushalMarksSide: {
        [Key in FidushalMarksSide]: string
    },
    position: {
        [Key in Position]: string
    }
}

export default OptionsFor;