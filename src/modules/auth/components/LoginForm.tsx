import { useCallback, useState } from "react";
import { ILoginParams, ILoginValidation } from "../../../models/auth";
import { validateLogin, validLogin } from "../utils";
import { Box, TextField, Alert, FormControlLabel, Switch, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import {FormattedMessage} from "react-intl"
interface Props {
    onLogin(values: ILoginParams): void;
    loading: boolean;
    errorMessage: string;
}
const LoginForm = (props: Props) => {
    const { onLogin, loading, errorMessage } = props;
    const [formValues, setFormValues] = useState<ILoginParams>({ email: "", password: "", rememberMe: false })
    const [validate, setValidate] = useState<ILoginValidation>()
    const submit = useCallback((e: any) => {
        e.preventDefault();
        const validate = validateLogin(formValues);

        setValidate(validate);

        if (!validLogin(validate)) {
            return;
        }
        onLogin(formValues)
    }, [formValues, onLogin])
    return (
        <Box component="form" width={1} maxWidth={"600px"} p={3} autoComplete="off" sx={{ display: "flex", flexDirection: "column", '& .MuiTextField-root': { width: '100%', pb: 2 }, '& .MuiFormControl-root': { pb: 2 }, "& .MuiAlert-root":{mb:2} }} noValidate onSubmit={submit}>
            <TextField
                required
                label={!!validate?.email ? <FormattedMessage id={validate.email} /> : <FormattedMessage id="email" />}
                type="email"
                error={!!validate?.email}
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
            <TextField
                required
                label={!!validate?.password ? <FormattedMessage id={validate.password} /> : <FormattedMessage id="password" />}
                type="password"
                autoComplete="on"
                error={!!validate?.password}
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            />

            <FormControlLabel control={<Switch checked={formValues.rememberMe} onChange={(e) => setFormValues({ ...formValues, rememberMe: !formValues.rememberMe })}/>} label={<FormattedMessage id="rememberMe" />} />
            {errorMessage !== "" && <Alert severity="error"><FormattedMessage id={errorMessage}/></Alert>}
            <Box width={1} display="flex" justifyContent="space-between" alignItems="center">
                <LoadingButton variant="outlined" size="large" type="submit" loading={loading}><FormattedMessage id="login"/></LoadingButton>
                <Button variant="text" href="/register"><FormattedMessage id="donthaveanaccount"/></Button>
            </Box>
        </Box>)
}
export default LoginForm