
import { useCallback, useState } from "react";
import { IRegisterParams, IRegisterValidation } from "../../../models/auth";
import { validateRegister, validRegister } from "../utils";
import { Box, TextField, Alert, Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, InputLabel, Select, MenuItem } from "@mui/material"
import { LoadingButton } from "@mui/lab"

interface Props {
    onRegister(values: IRegisterParams): void;
    loading: boolean;
    errorMessage: string;
    locations: Array<ILocationParams>;
    capitals: Array<ICapitalParams>;
    getCapitals: (pid: number) => Promise<void>;
}
interface ILocationParams {
    id: number;
    pid: number;
    name: string;
    createAt: string;
}
interface ICapitalParams extends ILocationParams { }
const RegisterForm = (props: Props) => {
    const { onRegister, loading, errorMessage, locations, capitals, getCapitals } = props;
    const [formValues, setFormValues] = useState<IRegisterParams>({ email: "", password: "", confirmPassword: "", name: "", gender: "male", region: "", state: "" })
    const [validate, setValidate] = useState<IRegisterValidation>()
    const submit = useCallback((e) => {
        e.preventDefault();
        console.log(formValues);
        const validate = validateRegister(formValues);

        setValidate(validate);

        if (!validRegister(validate)) {
            return;
        }
        onRegister(formValues)
    }, [formValues, onRegister])
    return (
        <Box component="form" width={1} maxWidth={"600px"} p={3} autoComplete="off" sx={{ display: "flex", flexDirection: "column", '& .MuiTextField-root': { width: '100%', pb: 2 }, '& .MuiFormControl-root': { pb: 2 }, "& .MuiAlert-root":{pb:2} }} noValidate onSubmit={submit}>
            <TextField
                required
                label={!!validate?.email ? "Please enter a valid email address" : "Email"}
                type="email"
                placeholder="Email..."
                error={!!validate?.email}
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
            <TextField
                required
                label={!!validate?.name ? "Please enter a valid name" : "Name"}
                type="text"
                placeholder="Name..."
                error={!!validate?.name}
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            />
            <TextField
                required
                label={!!validate?.password ? "Please enter a valid password" : "Password"}
                type="password"
                placeholder="Password..."
                error={!!validate?.password}
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            />  <TextField
                required
                label={!!validate?.confirmPassword ? "Please enter a valid password" : "Confirm Password"}
                type="password"
                placeholder="Confirm password..."
                error={!!validate?.confirmPassword}
                value={formValues.confirmPassword}
                onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
            />
            <FormControl fullWidth >
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                    row

                    value={formValues.gender}
                    onChange={(e) => setFormValues({ ...formValues, gender: formValues.gender === "male" ? "female" : "male" })}
                >
                    <FormControlLabel value="male" checked={formValues.gender === "male"} control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth error={!!validate?.region}><InputLabel>Region</InputLabel>
                <Select
                    value={formValues.region}
                    label="---Region---"
                    onChange={(e) => {
                        setFormValues({ ...formValues, region: e.target.value })
                        getCapitals(+e.target.value)
                    }}>
                    {locations.map(item => <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            {capitals.length > 0 && <FormControl fullWidth error={!!validate?.state}><InputLabel>Region</InputLabel>
                <Select

                    value={formValues.state}
                    label="---State---"
                    onChange={(e) => {
                        setFormValues({ ...formValues, state: e.target.value })
                    }}>
                    {capitals.map(item => <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>}
            {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}
            <Box width={1} display="flex" justifyContent="space-between" alignItems="center">
                <LoadingButton variant="outlined" size="large" type="submit" loading={loading}>Register</LoadingButton>
                <Button variant="text" href="/login">Already have an account?</Button>
            </Box>
        </Box>)
}
export default RegisterForm