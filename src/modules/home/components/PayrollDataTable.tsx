import { styled } from '@mui/material/styles';
import { tableCellClasses, tableClasses } from "@material-ui/core";
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IPayroll, IPayrollDetail } from '../../../models/data';
import { getPageInfo, getTotalPage } from '../utils';
import { useEffect, useState } from 'react';
import CustomPagination from './CustomPagination';
import PayrollDatatableRow from './PayrollDatatableRow';
import { FormattedMessage } from "react-intl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
    payroll?: IPayroll;
    onViewDetailClick: (payrollDetail: IPayrollDetail) => void;
    onDeleteClick: (payrollDetail: IPayrollDetail) => void;
    onSortClick: (column: string, reverse: boolean) => void;
}
interface SortOptions {
    by: "status" | "date" | "currency" | "total" | "order" | "";
    reverse: boolean
}

const PayrollDataTable = (props: Props) => {
    const StyledTable = styled(Table)(({ theme }) => ({
        [`&.${tableClasses.root}`]: {
            minWidth: 700,
        }
    }))
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "none",
            fontSize: 18,
            borderBottom: 0,
            width: "12.5%",
            color: "#163B57",
            cursor: "pointer",
        },
        [`&.${tableCellClasses.head}:nth-last-of-type(3)`]: {
            width: "15%",
        },
        [`&.${tableCellClasses.head}:nth-last-of-type(4)`]: {
            width: "10%",
        }
    }));
    const StyledButton = styled(Button)(({ theme }) => ({
        fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
        color: "#163B57",
        backgroundColor: "inherit",
        '&:hover': {
            backgroundColor: "inherit",
            borderColor: 'none',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'inherit',
            borderColor: 'none',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    }))
    const { payroll, onViewDetailClick, onDeleteClick, onSortClick } = props;
    const [sortOptions, setSortOptions] = useState<SortOptions>({ by: "", reverse: false })
    const [page, setPage] = useState(1)
    const recordsPerPage = 6
    const handleChangePage = (e: any, value: number) => {
        setPage(value);
    }
    const handleSortByColumn = (column: "status" | "date" | "currency" | "total" | "order" | "") => {
        setSortOptions((prevSortOptions) => {
            const { by, reverse } = prevSortOptions;
            if (by === column && by !== "") {
                return { ...prevSortOptions, reverse: !reverse }
            }
            return { by: column, reverse: false }
        })
    }
    useEffect(() => {
        if(!payroll){
            return
        }
        const TotalPage = getTotalPage([...payroll.payrolls].length, recordsPerPage)
        if(page > TotalPage){
            setPage(TotalPage)
        }
    }, [payroll])

    useEffect(() => onSortClick(sortOptions.by, sortOptions.reverse), [sortOptions])
    return (
        <>
            <TableContainer component={Grid} columns={12} container>
                <StyledTable sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow sx={{ display: "flex" }}>
                            <StyledTableCell align='left'><StyledButton endIcon={sortOptions.by === "status" && <FontAwesomeIcon icon={sortOptions.reverse ? faSortAlphaUp : faSortAlphaDown} />} onClick={(e) => handleSortByColumn("status")}><FormattedMessage id="status" /></StyledButton></StyledTableCell>
                            <StyledTableCell align="left"><StyledButton endIcon={sortOptions.by === "date" && <FontAwesomeIcon icon={sortOptions.reverse ? faSortUp : faSortDown} />} onClick={(e) => handleSortByColumn("date")}><FormattedMessage id="date" /></StyledButton></StyledTableCell>
                            <StyledTableCell align="left"><StyledButton endIcon={sortOptions.by === "currency" && <FontAwesomeIcon icon={sortOptions.reverse ? faSortAlphaUp : faSortAlphaDown} />} onClick={(e) => handleSortByColumn("currency")} ><FormattedMessage id="currency" /></StyledButton></StyledTableCell>
                            <StyledTableCell align="left"><StyledButton endIcon={sortOptions.by === "total" && <FontAwesomeIcon icon={sortOptions.reverse ? faSortUp : faSortDown} />} onClick={(e) => handleSortByColumn("total")}><FormattedMessage id="total" /></StyledButton></StyledTableCell>
                            <StyledTableCell align="left"><StyledButton endIcon={sortOptions.by === "order" && <FontAwesomeIcon icon={sortOptions.reverse ? faSortAlphaUp : faSortAlphaDown} />} onClick={(e) => handleSortByColumn("order")}><FormattedMessage id="order" /></StyledButton></StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payroll?.payrolls.slice(recordsPerPage * (page - 1), recordsPerPage * (page - 1) + recordsPerPage).map((pr, index) => (
                            <PayrollDatatableRow key={pr.payroll_id} payrollDetail={pr} onViewDetailClick={onViewDetailClick} onDeleteClick={onDeleteClick} />
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            {payroll &&
                <CustomPagination page={page} totalPage={getTotalPage([...payroll.payrolls].length, recordsPerPage)} totalRecord={[...payroll.payrolls].length} handleChangePage={handleChangePage} showing={getPageInfo(payroll, page, recordsPerPage)} />
            }
        </>
    );
};
export default PayrollDataTable;
