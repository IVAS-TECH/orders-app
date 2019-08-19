import React from 'react';
import DataItem from './DataItem';
import MuiDivider from '@material-ui/core/Divider';
import TextArea from './../formControl/TextArea';
import { styled } from '@material-ui/styles';
import Language from './../../store/language/Language';
import ImagePosition from './../imagePosition/ImagePosition';
import {
    StencilData as StencilDataType,
    Position,
    FidushalMarksKind,
    FidushalMarksSide
} from './../../type/StencilData';


export interface StencilDataProps {
    language: Language,
    stencilData: StencilDataType
};

const Divider = styled(MuiDivider)({
    marginTop: 8,
    marginBottom: 8
});

const StencilData: React.FC<StencilDataProps> = ({
    language,
    stencilData
}) => {
    const stencilFormLanguage = language.forms.stencilForm;
    return (
        <div>
            <DataItem
                description={stencilFormLanguage.file.fileArchive}
                value={stencilData.fileName} />
            <Divider />
            <DataItem
                description={stencilFormLanguage.isFromRackelSide}
                value={language.bool(stencilData.fileIsFromRackelSide)} />
            <Divider />
            <DataItem
                description={stencilFormLanguage.count}
                value={stencilData.count} />
            <Divider />
            <DataItem
                description={stencilFormLanguage.sheetThickness}
                value={stencilData.sheetThickness.toString() + ' μm'} />
            <Divider />
            <DataItem
                description={stencilFormLanguage.panelTitle.fidushalMarks}
                value={language.bool(!!stencilData.fidushalMarks)} />
            {!!stencilData.fidushalMarks && <React.Fragment>
                <DataItem
                    description={stencilFormLanguage.fidushalMarksKind}
                    value={fidushalMarksKindValue(stencilData.fidushalMarks.kind, language)} />
                <DataItem
                    description={stencilFormLanguage.fidushalMarksSide}
                    value={fidushalMarksSideValue(stencilData.fidushalMarks.side, language)} />
            </React.Fragment>}
            <Divider />
            <DataItem
                description={stencilFormLanguage.panelTitle.modificationsRequirements}
                value={language.bool(!!stencilData.modificationsRequirements)} />
            <Divider />
            {!!stencilData.modificationsRequirements && <React.Fragment>
                <TextArea
                    label={stencilFormLanguage.modificationsRequirements}
                    disabled
                    value={stencilData.modificationsRequirements}
                    expectedSymbolsPerRow={87} />
                <Divider />
            </React.Fragment>}
            <DataItem
                description={stencilFormLanguage.panelTitle.text}
                value={language.bool(!!stencilData.text)} />
            {!!stencilData.text && <React.Fragment>
                {stencilData.text!.rackelSide && <DataItem
                    description={stencilFormLanguage.textFromRackelSide}
                    value={stencilData.text.rackelSide} />
                }
                {stencilData.text!.pcbSide && <DataItem
                    description={stencilFormLanguage.textFromPCBSide}
                    value={stencilData.text.pcbSide} />
                }
            </React.Fragment>}
            <Divider />
            <DataItem
                description={stencilFormLanguage.panelTitle.multiply}
                value={language.bool(!!stencilData.multiply)} />
            {!!stencilData.multiply && <React.Fragment>
                <DataItem
                    description={stencilFormLanguage.panelsCountAxis('X')}
                    value={stencilData.multiply.x.panelsCount} />
                <DataItem
                    description={stencilFormLanguage.stepAxis('X')}
                    value={stencilData.multiply.x.step.toString() + ' mm'} />
                <DataItem
                    description={stencilFormLanguage.panelsCountAxis('Y')}
                    value={stencilData.multiply.y.panelsCount} />
                <DataItem
                    description={stencilFormLanguage.stepAxis('Y')}
                    value={stencilData.multiply.y.step.toString() + ' mm'} />
            </React.Fragment>}
            <Divider />
            <DataItem
                description={stencilFormLanguage.position}
                value={positionValue(stencilData.position, language)} />
            <Divider />
            <DataItem
                description={stencilFormLanguage.imagePosition}
                item={<ImagePosition position={stencilData.imagePosition} />} />
            <Divider />
            <DataItem
                description={stencilFormLanguage.nanoCoating}
                value={language.bool(stencilData.nanoCoating)} />
            <Divider />
            <DataItem
                description={stencilFormLanguage.electrochemicalPolishing}
                value={language.bool(stencilData.electrochemicalPolishing)} />
            <Divider />
        </div>
    );
};

export default StencilData;

function positionValue(position: Position, language: Language): string {
    const { layoutCentered, pcbCentered } = language.forms.stencilForm.options;
    switch(position) {
        case 'layout-centered': return layoutCentered;
        case 'pcb-centered': return pcbCentered;
    }
}

function fidushalMarksKindValue(kind: FidushalMarksKind, language: Language): string {
    const { cut, graved } = language.forms.stencilForm.options;
    switch(kind) {
        case 'cut': return cut;
        case 'graved': return graved;
    }
}

function fidushalMarksSideValue(side: FidushalMarksSide, language: Language): string {
    const { pcbSide, rackelSide, twoSided } = language.forms.stencilForm.options;
    switch(side) {
        case 'pcb': return pcbSide;
        case 'rackel': return rackelSide;
        case 'two-sided': return twoSided;
    }
}