import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OrderInfo from './../../../type/OrderInfo';
import TextContext from './../../../text/TextContext';
import Text from './../../../text/language/Text';
import format from 'date-fns/format';

interface OrdersInProcessProps {
    paperClass: string,
    titleClass: string,
    noOrdersToShowClass: string,
    orders: OrderInfo[],
    fetchOrderData: (id: string) => void
}

const OrdersInProcess: React.FC<OrdersInProcessProps> = ({
    paperClass,
    titleClass,
    noOrdersToShowClass,
    orders,
    fetchOrderData
}) => (
    <Paper className={paperClass}>
        {<TextContext.Consumer>
            {text => (
                <>
                    <Typography variant='h5' className={titleClass}>
                        {text.orderInfo.ordersInProcess}
                    </Typography>
                    {orders.length === 0 ?
                        <Typography
                            variant='h6'
                            align='center'
                            color='textSecondary'
                            className={noOrdersToShowClass}>
                            {text.orderInfo.noOrdersToShow}
                        </Typography> :
                        <Table>
                            {tableHead(text)}
                            <TableBody>
                                {orders.map(tableRow(text, fetchOrderData))}
                            </TableBody>
                        </Table>
                    }
                </>
            )}
        </TextContext.Consumer>}
    </Paper>
);

function tableHead(text: Text): JSX.Element {
    return (
        <TableHead>
            <TableRow>
                <TableCell>{text.orderInfo.orderId}</TableCell>
                <TableCell>{text.orderInfo.orderedBy}</TableCell>
                <TableCell>{text.orderInfo.orderDate}</TableCell>
                <TableCell>{text.orderInfo.file}</TableCell>
                <TableCell>{text.orderInfo.orderStatus}</TableCell>
            </TableRow>
        </TableHead>
    );
}

function tableRow(text: Text, fetchOrderData: (id: string) => void): (orderInfo: OrderInfo) => JSX.Element {
    return orderInfo => (
        <TableRow key={orderInfo.id}>
            <TableCell>
                <Button color='primary' onClick={() => fetchOrderData(orderInfo.id)}>
                    {orderInfo.id}
                </Button>
            </TableCell>
            <TableCell>{orderInfo.orderedBy}</TableCell>
            <TableCell>{format(orderInfo.date, 'dd.MM.yyyy HH:mm')}</TableCell>
            <TableCell>
                <Button href={orderInfo.file.url} download={orderInfo.file.name} color='primary'>
                    {orderInfo.file.name}        
                </Button>
            </TableCell>
            <TableCell>{text.orderStatus[orderInfo.status]}</TableCell>
        </TableRow>
    );
}

export default OrdersInProcess;