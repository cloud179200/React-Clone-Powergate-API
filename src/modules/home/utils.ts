import { blue, green, orange, purple, red } from "@mui/material/colors";
import { IFilter, IFilterValidation, IFormUpdatePayrollDetailValues, IFormUpdatePayrollDetailValuesValidation, IPayroll, IPayrollDetail } from "../../models/data";
import { LIST_STATUS_INVOICE_HISTORY } from "../../utils/constants";

export const getStatus = (payrollDetail: IPayrollDetail) => {
    let status = "";
    if(payrollDetail.time_created){
        status = "Pending"
    }
    if(payrollDetail.date_received){
        status = "Received"
        if(payrollDetail.date_matched){
            status = "Matched"
        }
    }
    if(payrollDetail.date_confirmed){
        status = "Processing"
        if (payrollDetail.fulfilled){
            status = "Fulfilled"
            if (payrollDetail.canceled){
                status = "Canceled"
            }
        }
    }
    return {status, color:getColor(status)}
}
export const getColor = (status:string) => {
    let color = "black"
    switch (status) {
        case "Received":
            color = blue[700]
            break;
        case "Canceled":
            color = red[500]
            break; 
        case "Fulfilled":
            color = blue[500]
            break; 
        case "Pending":
            color = purple[300]
            break; 
        case "Processing":
            color = orange[700]
            break;
        case "Matched":
            color = green[600]
            break;
        default:
            break;
    }
    return color
}
export const getTotalPage = (totalRecord: number, recordPerPage: number) => {
    console.log("[Total record] " + totalRecord)
    let totalPage = 1;
    const leftOverRecords = totalRecord%recordPerPage
    console.log("[leftover] " + leftOverRecords)

    const page = (totalRecord-leftOverRecords)/recordPerPage
    const pagePlusOne = page + 1
    console.log("[page] " + page)
    console.log("[page plus one] " + pagePlusOne)

    totalPage = leftOverRecords > 0 ? pagePlusOne:page
    return totalPage
}
export const getPageInfo = (payroll: IPayroll | undefined, page: number, recordPerPage: number) => {
    const pageInfo = {from: 0, to: 0, numberRecord: 0}
    if(!payroll || page < 1 || recordPerPage < 1){
        return pageInfo
    }
    
    const {length} =payroll.payrolls

    pageInfo.from = (page-1)*recordPerPage + 1
    const from = pageInfo.from + recordPerPage - 1
    pageInfo.to = from > length ? length: from

    const leftOverRecords = page*recordPerPage - length
    pageInfo.numberRecord = leftOverRecords > 0 ? leftOverRecords: recordPerPage

    return pageInfo
}

const validateStatus = (status: string) => {
    const statuses = [...LIST_STATUS_INVOICE_HISTORY, ""]
    if(statuses.indexOf(status) === -1){
        return "statusInvalid"
    }
    return '';
}
const validateFromAndTo = (from:Date, to:Date) => {
    if(from > to){
        return "dateInvalid"
    }
    return ''
}
const validateOrder = (order: string) => {
    return ''
}
export const validateFilter = (values: IFilter): IFilterValidation => {
    return {
        status: validateStatus(values.status),
        from: validateFromAndTo(values.from, values.to),
        to: validateFromAndTo(values.from, values.to),
        order: validateOrder(values.order),
    };
};

export const validFilter = (values: IFilterValidation) => {
    return !values.status && !values.from && !values.to && !values.order;
};

const validateUpdateFormValues = (column:"status"|"currency"|"date"|"amount"|"fees"|"order", values: IFormUpdatePayrollDetailValues) => {
    let validate = ''
    switch (column) {
        case "status":
            const statuses = LIST_STATUS_INVOICE_HISTORY
            if(statuses.indexOf(values.status) === -1){
                validate = "statusInvalid"
            }
            break;
        case "currency":
            validate = ""
            break;   
        case "date":
            if(!values.date){
                validate = "dateRequire"
            }
            break;   
        case "amount":
            validate = ""
            break;   
        case "fees":
            validate = ""
            break;   
        case "order":
            validate = ""
            break;   
        default:
            break;
    }
    return validate
}
export const validateUpdatePayrollDetail = (values: IFormUpdatePayrollDetailValues): IFormUpdatePayrollDetailValuesValidation => {
    return {
        status: validateUpdateFormValues("status", values),
        currency:validateUpdateFormValues("currency", values),
        date:validateUpdateFormValues("date", values),
        amount:validateUpdateFormValues("amount", values),
        fees:validateUpdateFormValues("fees", values),
        order:validateUpdateFormValues("order", values)
    };
};

export const validUpdatePayrollDetail = (values: IFormUpdatePayrollDetailValuesValidation) => {
    return !values.status && !values.currency && !values.date && !values.amount && !values.fees && !values.order;
};