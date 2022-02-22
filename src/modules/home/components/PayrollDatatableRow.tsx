import { tableCellClasses } from "@material-ui/core";
import { DeleteOutlined } from "@mui/icons-material";
import { Button, IconButton, styled, TableCell, TableRow, tableRowClasses } from "@mui/material";
import { memo } from "react";
import CurrencyFormat from "react-currency-format";
import { IPayrollDetail } from "../../../models/data";
import { getStatus } from "../utils";
import { FormattedMessage } from "react-intl"
import moment from "moment";
interface Props {
    payrollDetail: IPayrollDetail,
    onViewDetailClick: (payrollDetail: IPayrollDetail) => void;
    onDeleteClick: (payrollDetail: IPayrollDetail) => void;
}
const PayrollDatatableRow = (props: Props) => {
    const { payrollDetail, onViewDetailClick, onDeleteClick } = props;
    const { status, color } = getStatus(payrollDetail)
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            
            backgroundColor: "none",
            fontSize: 14,
            fontWeight: "bold",
            borderBottom: 0,
            width: "12.5%",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: "8px 24px"
        },
        [`&.${tableCellClasses.body}:last-child`]: {
            width: "5%",
            textOverflow: 'unset',
        },
        [`&.${tableCellClasses.body}:nth-last-of-type(2)`]: {
            width: "20%",
        },
        [`&.${tableCellClasses.body}:nth-last-of-type(3)`]: {
            width: "15%",
        },
        [`&.${tableCellClasses.body}:nth-last-of-type(4)`]: {
            width: "10%",
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        [`&.${tableRowClasses.root}`]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            margin: "1.2rem 0",
            borderRadius: 10
        },
    }));
    const dataFormatted = {
        status,
        date: moment(payrollDetail.time_created).format("DD/MM/yyyy"),
        currency: payrollDetail.currency,
        total: <CurrencyFormat displayType='text' thousandSeparator decimalScale={2} value={payrollDetail.volume_input_in_input_currency + payrollDetail.fees} />,
        order: payrollDetail.payroll_id
    }
    return (<StyledTableRow sx={{ borderRadius: 20 }}>
        <StyledTableCell align='left' sx={{ color: color }} title={dataFormatted.status}>{dataFormatted.status}</StyledTableCell>
        <StyledTableCell align="left" title={dataFormatted.date}>{dataFormatted.date}</StyledTableCell>
        <StyledTableCell align="left" title={dataFormatted.currency}>{dataFormatted.currency}</StyledTableCell>
        <StyledTableCell align="left" title={""}>{dataFormatted.total}</StyledTableCell>
        <StyledTableCell align="left" title={dataFormatted.order}>{dataFormatted.order}</StyledTableCell>
        <StyledTableCell align="center">
            <Button variant="outlined" fullWidth onClick={(e) => onViewDetailClick(payrollDetail)} sx={{ borderRadius: 15 }}><FormattedMessage id="viewDetail" /></Button>
        </StyledTableCell>
        <StyledTableCell align="center"><IconButton onClick={(e) => onDeleteClick(payrollDetail)} color="error">
            <DeleteOutlined fontSize="medium" />
        </IconButton>
        </StyledTableCell>
    </StyledTableRow>)
}
export default memo(PayrollDatatableRow)