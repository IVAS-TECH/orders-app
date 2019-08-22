import React from 'react';
import DataItem from './DataItem';
import MuiDivider from '@material-ui/core/Divider';
import TextArea from './../formControl/TextArea';
import { styled } from '@material-ui/styles';
import Text from './../../text/language/Text';
import ImagePosition from './../imagePosition/ImagePosition';
import { StencilData as StencilDataType } from './../../type/StencilData';

export interface StencilDataProps {
    text: Text,
    stencilData: StencilDataType
};

const Divider = styled(MuiDivider)({
    marginTop: 8,
    marginBottom: 8
});

const StencilData: React.FC<StencilDataProps> = ({
    text,
    stencilData
}) => (
     <div>
        <DataItem
            description={text.stencilForm.file.fileArchive}
            value={stencilData.fileName} />
        <Divider />
        <DataItem
            description={text.stencilForm.isFromRackelSide}
            value={text.bool(stencilData.fileIsFromRackelSide)} />
        <Divider />
        <DataItem
            description={text.stencilForm.count}
            value={stencilData.count} />
        <Divider />
        <DataItem
            description={text.stencilForm.sheetThickness}
            value={stencilData.sheetThickness.toString() + ' μm'} />
        <Divider />
        <DataItem
            description={text.stencilForm.panelTitle.fidushalMarks}
            value={text.bool(!!stencilData.fidushalMarks)} />
        {!!stencilData.fidushalMarks && <React.Fragment>
            <DataItem
                description={text.stencilForm.fidushalMarksKind}
                value={text.stencilForm.optionsFor.fidushalMarksKind[stencilData.fidushalMarks.kind]} />
            <DataItem
                description={text.stencilForm.fidushalMarksSide}
                value={text.stencilForm.optionsFor.fidushalMarksSide[stencilData.fidushalMarks.side]} />
        </React.Fragment>}
        <Divider />
        <DataItem
            description={text.stencilForm.panelTitle.modificationsRequirements}
            value={text.bool(!!stencilData.modificationsRequirements)} />
        <Divider />
        {!!stencilData.modificationsRequirements && <React.Fragment>
            <TextArea
                label={text.stencilForm.modificationsRequirements}
                disabled
                value={stencilData.modificationsRequirements}
                expectedSymbolsPerRow={87} />
            <Divider />
        </React.Fragment>}
        <DataItem
            description={text.stencilForm.panelTitle.text}
            value={text.bool(!!stencilData.text)} />
        {!!stencilData.text && <React.Fragment>
            {stencilData.text!.rackelSide && <DataItem
                description={text.stencilForm.textFromRackelSide}
                value={stencilData.text.rackelSide} />
            }
            {stencilData.text!.pcbSide && <DataItem
                description={text.stencilForm.textFromPCBSide}
                value={stencilData.text.pcbSide} />
            }
        </React.Fragment>}
        <Divider />
        <DataItem
            description={text.stencilForm.panelTitle.multiply}
            value={text.bool(!!stencilData.multiply)} />
        {!!stencilData.multiply && <React.Fragment>
            <DataItem
                description={text.stencilForm.panelsCountAxis('X')}
                value={stencilData.multiply.x.panelsCount} />
            <DataItem
                description={text.stencilForm.stepAxis('X')}
                value={stencilData.multiply.x.step.toString() + ' mm'} />
            <DataItem
                description={text.stencilForm.panelsCountAxis('Y')}
                value={stencilData.multiply.y.panelsCount} />
            <DataItem
                description={text.stencilForm.stepAxis('Y')}
                value={stencilData.multiply.y.step.toString() + ' mm'} />
        </React.Fragment>}
        <Divider />
        <DataItem
            description={text.stencilForm.position}
            value={text.stencilForm.optionsFor.position[stencilData.position]} />
        <Divider />
        <DataItem
            description={text.stencilForm.imagePosition}
            item={<ImagePosition position={stencilData.imagePosition} />} />
        <Divider />
        <DataItem
            description={text.stencilForm.nanoCoating}
            value={text.bool(stencilData.nanoCoating)} />
        <Divider />
        <DataItem
            description={text.stencilForm.electrochemicalPolishing}
            value={text.bool(stencilData.electrochemicalPolishing)} />
        <Divider />
    </div>
);

export default StencilData;