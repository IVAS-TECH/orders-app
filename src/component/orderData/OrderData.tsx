import React from 'react';
import DataItem from './DataItem';
import MuiDivider from '@material-ui/core/Divider';
import TextArea from '../formControl/TextArea';
import { styled } from '@material-ui/styles';
import Text from '../../text/language/Text';
import ImagePosition from '../imagePosition/ImagePosition';
import { OrderData as OrderDataType } from '../../type/OrderData';

export interface OrderDataProps {
    text: Text,
    orderData: OrderDataType
};

const Divider = styled(MuiDivider)({
    marginTop: 8,
    marginBottom: 8
});

const OrderData: React.FC<OrderDataProps> = ({
    text,
    orderData
}) => (
     <div>
        <DataItem
            description={text.stencilForm.file.fileArchive}
            value={orderData.fileName} />
        <Divider />
        <DataItem
            description={text.stencilForm.isFromRackelSide}
            value={text.bool(orderData.fileIsFromRackelSide)} />
        <Divider />
        <DataItem
            description={text.stencilForm.count}
            value={orderData.count} />
        <Divider />
        <DataItem
            description={text.stencilForm.sheetThickness}
            value={orderData.sheetThickness.toString() + ' μm'} />
        <Divider />
        <DataItem
            description={text.stencilForm.panelTitle.fidushalMarks}
            value={text.bool(!!orderData.fidushalMarks)} />
        {!!orderData.fidushalMarks && <>
            <DataItem
                description={text.stencilForm.fidushalMarksKind}
                value={text.stencilForm.optionsFor.fidushalMarksKind[orderData.fidushalMarks.kind]} />
            <DataItem
                description={text.stencilForm.fidushalMarksSide}
                value={text.stencilForm.optionsFor.fidushalMarksSide[orderData.fidushalMarks.side]} />
        </>}
        <Divider />
        <DataItem
            description={text.stencilForm.panelTitle.modificationsRequirements}
            value={text.bool(!!orderData.modificationsRequirements)} />
        <Divider />
        {!!orderData.modificationsRequirements && <>
            <TextArea
                label={text.stencilForm.modificationsRequirements}
                disabled
                value={orderData.modificationsRequirements}
                expectedSymbolsPerRow={87} />
            <Divider />
        </>}
        <DataItem
            description={text.stencilForm.panelTitle.text}
            value={text.bool(!!orderData.text)} />
        {!!orderData.text && <>
            {orderData.text!.rackelSide && <DataItem
                description={text.stencilForm.textFromRackelSide}
                value={orderData.text.rackelSide} />
            }
            {orderData.text!.pcbSide && <DataItem
                description={text.stencilForm.textFromPCBSide}
                value={orderData.text.pcbSide} />
            }
        </>}
        <Divider />
        <DataItem
            description={text.stencilForm.panelTitle.multiply}
            value={text.bool(!!orderData.multiply)} />
        {!!orderData.multiply && <>
            <DataItem
                description={text.stencilForm.panelsCountAxis('X')}
                value={orderData.multiply.x.panelsCount} />
            <DataItem
                description={text.stencilForm.stepAxis('X')}
                value={orderData.multiply.x.step.toString() + ' mm'} />
            <DataItem
                description={text.stencilForm.panelsCountAxis('Y')}
                value={orderData.multiply.y.panelsCount} />
            <DataItem
                description={text.stencilForm.stepAxis('Y')}
                value={orderData.multiply.y.step.toString() + ' mm'} />
        </>}
        <Divider />
        <DataItem
            description={text.stencilForm.position}
            value={text.stencilForm.optionsFor.position[orderData.position]} />
        <Divider />
        <DataItem
            description={text.stencilForm.imagePosition}
            item={<ImagePosition position={orderData.imagePosition} />} />
        <Divider />
        <DataItem
            description={text.stencilForm.nanoCoating}
            value={text.bool(orderData.nanoCoating)} />
        <Divider />
        <DataItem
            description={text.stencilForm.electrochemicalPolishing}
            value={text.bool(orderData.electrochemicalPolishing)} />
        <Divider />
    </div>
);

export default OrderData;