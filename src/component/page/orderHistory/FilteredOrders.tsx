import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OrderInfo from '../../../type/OrderInfo';
import TextContext from '../../../text/TextContext';
import Text from '../../../text/language/Text';
import format from 'date-fns/format';

interface FilterdOrdersProps {
    titleClass: string,
    noOrdersToShowClass: string,
    orders: OrderInfo[],
    fetchOrderData: (id: string) => void,
    ordersPerPageOptions: number[],
    ordersCount: number,
    ordersPerPage: number,
    pageNumber: number,
    memberIdToNameMap: Record<string, string>
}

const FilterdOrders: React.FC<FilterdOrdersProps> = ({
    titleClass,
    noOrdersToShowClass,
    orders,
    fetchOrderData,
    ordersPerPageOptions,
    ordersCount,
    ordersPerPage,
    pageNumber,
    memberIdToNameMap
}) => {
    const emptyRows = Math.max(0, ordersPerPage - orders.length);
    
    return (
        <TextContext.Consumer>
            {text => (
                <>
                    <Typography variant='h5' className={titleClass}>
                        {text.orderInfo.searchResult}
                    </Typography>
                    {orders.length === 0 ?
                        <Typography
                            variant='h6'
                            align='center'
                            color='textSecondary'
                            className={noOrdersToShowClass}>
                            {text.orderInfo.noOrdersFound}
                        </Typography> :
                        <>
                            <Table>
                                {tableHead(text)}
                                <TableBody>
                                    {orders.map(tableRow(text, memberIdToNameMap, fetchOrderData))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                    rowsPerPageOptions={ordersPerPageOptions}
                                    component='div'
                                    count={ordersCount}
                                    rowsPerPage={ordersPerPage}
                                    page={pageNumber}
                                    labelRowsPerPage={`${text.orderInfo.ordersPerPage}: `}
                                    labelDisplayedRows={text.orderInfo.ordersInfo}
                                    onChangePage={() => { }}
                                    onChangeRowsPerPage={() => { }} />
                        </>
                    }
                </>
            )}
        </TextContext.Consumer>
    );
}

function tableHead(text: Text): JSX.Element {
    return (
        <TableHead>
            <TableRow>
                <TableCell>{text.orderInfo.orderId}</TableCell>
                <TableCell>{text.orderInfo.orderedBy}</TableCell>
                <TableCell>{text.orderInfo.orderDate}</TableCell>
                <TableCell>{text.orderInfo.file}</TableCell>
                <TableCell>{text.orderInfo.orderStatus}</TableCell>
                <TableCell>{text.action.action}</TableCell>
            </TableRow>
        </TableHead>
    );
}

function tableRow(
    text: Text,
    memberIdToNameMap: Record<string, string>,
    fetchOrderData: (id: string) => void
): (orderInfo: OrderInfo) => JSX.Element {
    return orderInfo => (
        <TableRow key={orderInfo.id}>
            <TableCell>
                <Button color='primary' onClick={() => fetchOrderData(orderInfo.id)}>
                    {orderInfo.id}
                </Button>
            </TableCell>
            <TableCell>{memberIdToNameMap[orderInfo.orderedBy]}</TableCell>
            <TableCell>{format(orderInfo.date, 'dd.MM.yyyy HH:mm')}</TableCell>
            <TableCell>
                <Button href={orderInfo.file.url} download={orderInfo.file.name} color='primary'>
                    {orderInfo.file.name}        
                </Button>
            </TableCell>
            <TableCell>{text.orderStatus[orderInfo.status]}</TableCell>
            <TableCell>
                <Button color='secondary' variant='outlined'>
                    {text.action.orderAgain}
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default FilterdOrders;