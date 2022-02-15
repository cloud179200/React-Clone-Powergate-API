import { useCallback, useEffect, useState } from "react"
import { Grid } from "@mui/material";
import { IRegisterParams } from "../../../models/auth";
import RegisterForm from "../components/RegisterForm"
import { blue } from "@mui/material/colors";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { AppState } from "../../../redux/reducer";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux"
import { ROUTES } from "../../../configs/routes";
import { replace } from "connected-react-router";
import { getErrorMessageResponse } from "../../../utils";
const RegisterPage = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [locations, setLocations] = useState([])
    const [capitals, setCapitals] = useState([])

    const getLocations = useCallback(async (): Promise<void> => {
        const json = await dispatch(fetchThunk(API_PATHS.location, "get"))
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setLocations(json.data)
            return;
        }

        setErrorMessage(getErrorMessageResponse(json));
    }, [dispatch])

    useEffect(() => {
        getLocations()
    }, [getLocations])

    const getCapitals = useCallback(async (pid: number | string): Promise<void> => {
        const json = await dispatch(fetchThunk(`${API_PATHS.location}?pid=${pid}`, "get"))

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setCapitals(json.data)
            return;
        }

        setErrorMessage(getErrorMessageResponse(json));
    }, [dispatch])

    const onRegister = useCallback(async (values: IRegisterParams) => {
        setErrorMessage("");
        setLoading(true)
        const json = await dispatch(fetchThunk(API_PATHS.signUp, "post", { email: values.email, password: values.password, repeatPassword: values.confirmPassword, name: values.name, gender: values.gender, region: +values.region, state: +values.state }))
        setLoading(false);

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            dispatch(replace(ROUTES.login));
            return;
        }

        setErrorMessage(getErrorMessageResponse(json));
    }, [dispatch])

    return ( <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        width={1}>
        <Grid container
            direction="row"
            columns={6} width={1} justifyContent="space-evenly"
            alignItems="center" maxWidth={"600px"} sx={{ backgroundColor: "white", border: `2px solid ${blue["A100"]}`, borderRadius: 10 }}>
            <RegisterForm loading={loading} onRegister={onRegister} errorMessage={errorMessage} locations={locations} capitals={capitals} getCapitals={getCapitals} />
        </Grid>
    </Grid>
    )
}
export default RegisterPage