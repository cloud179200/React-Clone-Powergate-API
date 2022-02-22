import { DatePicker, LoadingButton } from "@mui/lab";
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react"
import { FormattedMessage } from "react-intl";
import { IPayrollDetail } from "../../../models/data"
import { getStatus, validateUpdatePayrollDetail, validUpdatePayrollDetail } from "../utils";
import { IFormUpdatePayrollDetailValues, IFormUpdatePayrollDetailValuesValidation } from "../../../models/data"
import { LIST_STATUS_INVOICE_HISTORY } from "../../../utils/constants";
interface Props {
    onUpdatePayrollDetail: (values: IPayrollDetail) => void;
    payrollDetail: IPayrollDetail;
    cancelModal: () => void;
    errorMessage: string;
    successMessage: string;
    loading: boolean;
}

const UpdatePayrollDetailForm = (props: Props) => {

    const { onUpdatePayrollDetail, payrollDetail, cancelModal, errorMessage, successMessage, loading } = props
    const [formValues, setFormValues] = useState<IFormUpdatePayrollDetailValues>({ status: "", currency: "", date: new Date(), amount: 0, fees: 0, order: "" })
    const [clonePayrollDetail, setClonePayrollDetail] = useState<IPayrollDetail>()
    const [validate, setValidate] = useState<IFormUpdatePayrollDetailValuesValidation>()
    const statuses = LIST_STATUS_INVOICE_HISTORY

    const submit = useCallback((e: any) => {
        e.preventDefault();
        if (!setClonePayrollDetail) {
            return
        }
        const validate = validateUpdatePayrollDetail(formValues);
        setValidate(validate);

        if (!validUpdatePayrollDetail(validate)) {
            return;
        }
        clonePayrollDetail && onUpdatePayrollDetail({ ...clonePayrollDetail })
    }, [clonePayrollDetail, formValues, onUpdatePayrollDetail])
    const handleStatusChange = useCallback((e: any) => {
        setFormValues({ ...formValues, status: e.target.value })
        switch (e.target.value) {
            case "Pending":
                clonePayrollDetail && setClonePayrollDetail({ ...clonePayrollDetail, date_canceled: null, date_confirmed: null, date_fulfilled: null, date_matched: null, date_processed: null, date_received: null, date_released: null })
                break;
            case "Received":
                clonePayrollDetail && setClonePayrollDetail({ ...clonePayrollDetail, date_canceled: null, date_confirmed: null, date_fulfilled: null, date_matched: null, date_processed: null, date_received: new Date().toISOString(), date_released: null })
                break;
            case "Matched":
                clonePayrollDetail && setClonePayrollDetail({ ...clonePayrollDetail, date_canceled: null, date_confirmed: null, date_fulfilled: null, date_matched: new Date().toISOString(), date_processed: null, date_received: new Date().toISOString(), date_released: null })
                break;
            case "Processing":
                clonePayrollDetail && setClonePayrollDetail({ ...clonePayrollDetail, date_canceled: null, date_confirmed: new Date().toISOString(), date_fulfilled: null, date_matched: null, date_processed: null, date_received: null, date_released: null })
                break;
            case "Fulfilled":
                clonePayrollDetail && setClonePayrollDetail({ ...clonePayrollDetail, date_canceled: null, date_confirmed: new Date().toISOString(), date_fulfilled: new Date().toISOString(), date_matched: null, date_processed: null, date_received: null, date_released: null })
                break;
            case "Canceled":
                clonePayrollDetail && setClonePayrollDetail({ ...clonePayrollDetail, date_canceled: new Date().toISOString(), date_confirmed: new Date().toISOString(), date_fulfilled: new Date().toISOString(), date_matched: null, date_processed: null, date_received: null, date_released: null })
                break;
            default:
                break;
        }
    }, [clonePayrollDetail, formValues])
    useEffect(() => {
        setFormValues({ status: getStatus(payrollDetail).status, currency: payrollDetail.currency, date: new Date(payrollDetail.time_created), amount: payrollDetail.volume_input_in_input_currency, fees: payrollDetail.fees, order: payrollDetail.payroll_id })
        setClonePayrollDetail({ ...payrollDetail })
    }, [payrollDetail])
    return <>
        <Grid container columns={12} p={2} justifyContent="flex-start" alignItems="center">
            <Typography variant="body1" fontSize={24}>Update Payroll Detail</Typography>
        </Grid>
        <Grid container columns={12} p={2} justifyContent="flex-start" alignItems="center">
            <Box component="form" width={1} maxWidth={"600px"} p={3} autoComplete="off" sx={{ display: "flex", flexDirection: "column", '& .MuiTextField-root': { width: '100%', pb: 2 }, '& .MuiFormControl-root': { pb: 2 }, "& .MuiAlert-root": { mb: 2 } }} noValidate onSubmit={submit}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel><FormattedMessage id="status" /></InputLabel>
                    <Select
                        label={!!validate?.status ? <FormattedMessage id={validate.status} /> : <FormattedMessage id="status" />}
                        value={formValues.status}
                        onChange={handleStatusChange}
                        error={!!validate?.status}
                    >
                        {statuses.map((stt) =>
                            <MenuItem value={stt} key={stt}>{stt}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <DatePicker
                    label={!!validate?.date ? <FormattedMessage id={validate.date} /> : <FormattedMessage id="date" />}
                    value={formValues.date}
                    onChange={(e) => { }}
                    disabled
                    renderInput={(params) => (
                        <TextField {...params} error={!!validate?.date} />
                    )}
                    inputFormat="dd/MM/yyyy"
                />
                <TextField
                    required
                    label={!!validate?.currency ? <FormattedMessage id={validate.currency} /> : <FormattedMessage id="currency" />}
                    type="text"
                    autoComplete="off"
                    error={!!validate?.currency}
                    value={formValues?.currency}
                    onChange={(e) => {
                        if (formValues && clonePayrollDetail && true) {
                            setFormValues({ ...formValues, currency: e.target.value });
                            setClonePayrollDetail({ ...clonePayrollDetail, currency: e.target.value })
                        }
                    }}
                />
                <TextField
                    required
                    label={!!validate?.amount ? <FormattedMessage id={validate.amount} /> : <FormattedMessage id="amount" />}
                    type="number"
                    autoComplete="off"
                    error={!!validate?.amount}
                    value={formValues?.amount}
                    onChange={(e) => {
                        if (formValues && clonePayrollDetail && true) {
                            setFormValues({ ...formValues, amount: +e.target.value });
                            setClonePayrollDetail({ ...clonePayrollDetail, volume_input_in_input_currency: +e.target.value })
                        }
                    }}
                />
                <TextField
                    required
                    label={!!validate?.fees ? <FormattedMessage id={validate.fees} /> : <FormattedMessage id="fees" />}
                    type="number"
                    autoComplete="off"
                    error={!!validate?.fees}
                    value={formValues?.fees}
                    onChange={(e) => {
                        if (formValues && clonePayrollDetail && true) {
                            setFormValues({ ...formValues, fees: +e.target.value });
                            setClonePayrollDetail({ ...clonePayrollDetail, fees: +e.target.value })
                        }
                    }}
                />
                <TextField
                    required
                    label={!!validate?.order ? <FormattedMessage id={validate.order} /> : <FormattedMessage id="order" />}
                    type="text"
                    autoComplete="off"
                    error={!!validate?.order}
                    value={formValues?.order}
                    disabled
                />
                {successMessage !== "" && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}
                <Box width={1} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <LoadingButton variant="contained" size="large" type="submit" loading={loading}>Update</LoadingButton>
                    <Button variant="contained" size="large" color="error" onClick={(e) => cancelModal()}>Cancel</Button>
                </Box>
            </Box>
        </Grid>
    </>
}
export default UpdatePayrollDetailForm