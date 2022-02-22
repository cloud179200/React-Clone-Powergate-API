import { Box, Button, Container, Fade, Grid, Modal, Typography } from "@mui/material"
import { blue, grey } from "@mui/material/colors"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IFilter, IPayroll, IPayrollDetail } from "../../../models/data"
import { AppState } from "../../../redux/reducer"
import { LIST_PAYROLL } from "../../../utils/constants"
import PayrollDataTable from "../components/PayrollDataTable"
import Filter from "../components/Filter"
import { setPayroll } from "../redux/dataReducer"
import { ExportReactCSV } from "../components/ExportCSV"
import { getStatus } from "../utils"
import UpdatePayrollDetailForm from "../components/PayrollDetailUpdateForm"
interface Props { }
interface IModal {
    openViewDetail: boolean;
    openDelete: boolean;
    targetPayrollDetail: IPayrollDetail | null;
}
const DataTablePage = (props: Props) => {
    const dispatch = useDispatch()
    const { payroll } = useSelector((state: AppState) => ({
        payroll: state.data.payroll,
    }));
    const [clonePayroll, setClonePayroll] = useState<IPayroll | undefined>()
    //Filter
    const handleApplyFilter = useCallback((filter: IFilter) => {
        if (!payroll) {
            return
        }
        const { status, from, to, order } = filter
        const newClonePayroll = { ...payroll }
        let newPayrollDetails = [...newClonePayroll.payrolls]
        if (status) newPayrollDetails = newPayrollDetails.filter(payroll => getStatus(payroll).status === status);
        newPayrollDetails = newPayrollDetails.filter(payroll => (from <= new Date(payroll.time_created)) && (to >= new Date(payroll.time_created)) && true);
        if (order) newPayrollDetails = newPayrollDetails.filter(payroll => payroll.payroll_id.indexOf(status) !== -1);
        newClonePayroll.payrolls = newPayrollDetails;
        setClonePayroll({ ...newClonePayroll })
    }, [payroll])
    const handleClearFilter = useCallback(() => {
        if (!payroll) {
            return
        }
        setClonePayroll({ ...payroll })
    }, [payroll])
    //Sort
    const onSortClick = useCallback((column: string, reverse: boolean) => {
        if (!clonePayroll) {
            return
        }
        const newClonePayroll = { ...clonePayroll }
        let newPayrollDetails = [...newClonePayroll.payrolls]
        switch (column) {
            case "status":
                newPayrollDetails.sort((firstEl, secondEl) => (getStatus(firstEl).status > getStatus(secondEl).status) ? (reverse ? -1 : 1) : (getStatus(firstEl).status < getStatus(secondEl).status) ? (reverse ? 1 : -1) : 0)
                break;
            case "date":
                newPayrollDetails.sort((firstEl, secondEl) => {
                    const firstDate = new Date(firstEl.time_created)
                    const secondDate = new Date(secondEl.time_created)
                    return firstDate < secondDate ? (reverse ? -1 : 1) : firstDate > secondDate ? (reverse ? 1 : -1) : 0
                })
                break;
            case "currency":
                newPayrollDetails.sort((firstEl, secondEl) => firstEl.currency > secondEl.currency ? (reverse ? -1 : 1) : firstEl.currency < secondEl.currency ? (reverse ? 1 : -1) : 0)
                break;
            case "total":
                newPayrollDetails.sort((firstEl, secondEl) => {
                    const firstTotal = firstEl.volume_input_in_input_currency + firstEl.fees
                    const secondTotal = secondEl.volume_input_in_input_currency + secondEl.fees
                    return firstTotal < secondTotal ? (reverse ? -1 : 1) : firstTotal > secondTotal ? (reverse ? 1 : -1) : 0
                })
                break;
            case "order":
                newPayrollDetails.sort((firstEl, secondEl) => firstEl.payroll_id > secondEl.payroll_id ? (reverse ? -1 : 1) : firstEl.payroll_id < secondEl.payroll_id ? (reverse ? 1 : -1) : 0)
                break
            default:
                break;
        }
        newClonePayroll.payrolls = newPayrollDetails
        setClonePayroll(newClonePayroll)
    }, [clonePayroll])
    //Modal
    const [modal, setModal] = useState<IModal>({ openViewDetail: false, openDelete: false, targetPayrollDetail: null })
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)
    const [updateErrorMessage, setUpdateErrorMessage] = useState<string>("")
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState<string>("")
    const onViewDetailClick = (payrollDetail: IPayrollDetail) => {
        setUpdateErrorMessage("")
        setUpdateSuccessMessage("")
        setModal({ ...modal, openViewDetail: true, targetPayrollDetail: payrollDetail })
    }
    const onDeleteClick = (payrollDetail: IPayrollDetail) => {
        setModal({ ...modal, openDelete: true, targetPayrollDetail: payrollDetail })
    }
    const delelePayrollDetail = useCallback(async (payroll_id: string) => {
        if (!payroll) {
            return
        }
        setClonePayroll((prevClonePayroll) => {
            if (!prevClonePayroll) {
                return prevClonePayroll
            }
            const newClonePayroll = { ...prevClonePayroll }
            let newClonePayrollDetails = [...newClonePayroll.payrolls]
            newClonePayrollDetails = newClonePayrollDetails.filter(payrolDetail => payrolDetail.payroll_id !== payroll_id)
            newClonePayroll.payrolls = newClonePayrollDetails
            return newClonePayroll
        })
        const newPayroll = { ...payroll }
        let newPayrollDetails = [...newPayroll.payrolls]
        newPayrollDetails = newPayrollDetails.filter((payrollDetail) => payrollDetail.payroll_id !== payroll_id)
        newPayroll.payrolls = newPayrollDetails
        dispatch(setPayroll(newPayroll))
        setModal({...modal, openDelete:false, targetPayrollDetail:null})
    }, [dispatch, payroll, modal])
    const updatePayrollDetail = useCallback(async (payrollDetail: IPayrollDetail) => {
        if (!payroll) {
            return
        }
        
        setClonePayroll((prevClonePayroll) => {
            if (!prevClonePayroll) {
                return prevClonePayroll
            }
            const newClonePayroll = { ...prevClonePayroll }
            const newClonePayrollDetails = [...newClonePayroll.payrolls]
            const cloneIndexToUpdate = newClonePayrollDetails.findIndex(item => item.payroll_id === payrollDetail.payroll_id)
            newClonePayrollDetails[cloneIndexToUpdate] = { ...payrollDetail }
            newClonePayroll.payrolls = newClonePayrollDetails
            return newClonePayroll
        })
        const newPayroll = { ...payroll }
        const newPayrollDetails = [...newPayroll.payrolls]
        const indexToUpdate = newPayrollDetails.findIndex(item => item.payroll_id === payrollDetail.payroll_id)
        const newPayrollDetail = { ...payrollDetail }
        newPayrollDetails[indexToUpdate] = { ...newPayrollDetail }
        newPayroll.payrolls = newPayrollDetails
        await dispatch(setPayroll(newPayroll));
    }, [dispatch, payroll])
    const handleConfirmUpdate = (payrollDetail: IPayrollDetail) => {
        setUpdateErrorMessage("")
        setUpdateSuccessMessage("")
        setUpdateLoading(true);
        if (JSON.stringify(payrollDetail) === JSON.stringify(modal.targetPayrollDetail)) {
            setUpdateErrorMessage("You haven't change anything")
            setUpdateLoading(false)
            return
        }
        updatePayrollDetail(payrollDetail)
        setUpdateLoading(false)
        setUpdateSuccessMessage("Update success")
    }
    const handleConfirmDelete = (e: any) => {
        if (!modal.targetPayrollDetail) {
            return
        }
        delelePayrollDetail(modal.targetPayrollDetail.payroll_id)
    }
    //Init data
    const getPayroll = useCallback(() => {
        dispatch(setPayroll(LIST_PAYROLL))
    }, [dispatch])
    useEffect(() => {
        getPayroll();
    }, [getPayroll])
    useEffect(() => {
        if (payroll) {
            setClonePayroll((prevClonePayroll) => {
                if (!prevClonePayroll) {
                    return { ...payroll }
                }
                const newClonePayroll = { ...prevClonePayroll }
                let newClonePayrollDetails = [...newClonePayroll.payrolls]
                newClonePayrollDetails = newClonePayrollDetails.filter(item => payroll.payrolls.findIndex(i => i.payroll_id === item.payroll_id) !== -1)
                newClonePayroll.payrolls = newClonePayrollDetails
                return newClonePayroll
            })
        }
    }, [payroll])
    return <Grid container direction="row"
        justifyContent="center"
        alignItems="center"
        width={1}
        height="100vh"
        sx={{ backgroundColor: blue["100"] }}>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            columns={12}
            width={1}
            maxWidth="1280px"
            p={2}
            m={2}
            sx={{
                borderRadius: 4,
                background: grey["100"],
                border: `3px solid ${grey["700"]}`,
            }}
        >
            <Grid container justifyContent="center" alignItems="center">
                <Grid container columns={12} justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" sx={{ color: blue["700"], fontWeight: "bold", fontSize: 24 }}>Payroll Transactions List</Typography>
                    <Button variant="contained" sx={{
                        "& a": {
                            color: "inherit",
                            textDecoration: "none"
                        }
                    }}>
                        {clonePayroll ? <ExportReactCSV csvData={clonePayroll.payrolls} fileName="data.csv" /> : "ExportCSV"}
                    </Button>
                </Grid>
                <Grid container columns={12} mt={2} mb={2} justifyContent="space-between" alignItems="center">
                    <Filter onApply={handleApplyFilter} onClear={handleClearFilter} />
                </Grid>
                <Grid container columns={12} justifyContent="center" alignItems="center">
                    <PayrollDataTable payroll={clonePayroll} onViewDetailClick={onViewDetailClick} onDeleteClick={onDeleteClick} onSortClick={onSortClick} />
                </Grid>
            </Grid>
        </Grid>
        <Modal
            open={modal.openViewDetail}
            onClose={() => setModal({ ...modal, openViewDetail: false, targetPayrollDetail: null })}
        >
            {modal.targetPayrollDetail ? <Fade in={modal.openViewDetail}>
                <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        p={2}
                        style={{
                            borderRadius: 4,
                            background: grey["100"],
                            border: `3px solid ${grey["700"]}`,
                        }}>
                        <UpdatePayrollDetailForm successMessage={updateSuccessMessage} errorMessage={updateErrorMessage} loading={updateLoading} onUpdatePayrollDetail={handleConfirmUpdate} payrollDetail={modal.targetPayrollDetail} cancelModal={() => { setModal({ ...modal, openViewDetail: false }) }} />
                    </Grid>
                </Container>
            </Fade> : <></>}
        </Modal>
        <Modal
            open={modal.openDelete}
            onClose={() => setModal({ ...modal, openDelete: false, targetPayrollDetail: null })}
        >
            {modal.targetPayrollDetail ? <Fade in={modal.openDelete}>
                <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        p={2}
                        style={{
                            borderRadius: 4,
                            background: grey["100"],
                            border: `3px solid ${grey["700"]}`,
                        }}>
                        <Grid container columns={12} p={2} justifyContent="flex-start" alignItems="center">
                            <Typography variant="body1" fontSize={24}>Confirm Delete?</Typography>
                        </Grid>
                        <Box component="span" width={1} maxWidth={"600px"} p={3} sx={{ display: "flex", flexDirection: "column", '& .MuiTextField-root': { width: '100%', pb: 2 }, '& .MuiFormControl-root': { pb: 2 }, "& .MuiAlert-root": { mb: 2 } }}>
                            <Box width={1} display="flex" justifyContent="space-between" alignItems="center">
                                <Button variant="contained" size="large" onClick={handleConfirmDelete}>Confirm</Button>
                                <Button variant="contained" size="large" color="error" onClick={(e) => setModal({ ...modal, openDelete: false })}>Cancel</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Container>
            </Fade> : <></>}

        </Modal>
    </Grid >
}
export default DataTablePage