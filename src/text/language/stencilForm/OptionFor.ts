import {
    FidushalMarksKind,
    FidushalMarksSide,
    Position
} from './../../../type/OrderData';

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