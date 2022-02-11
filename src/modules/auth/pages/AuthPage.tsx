import { Grid, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ROUTES } from "../../../configs/routes";
import {FormattedMessage} from "react-intl"

const AuthPage = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            height={"100vh"}
            width={1}
        >
            <Grid container columns={6} width={1} justifyContent="space-evenly"
                alignItems="center" maxWidth={"600px"} 
                p={3}
                sx={{ backgroundColor: "white", border: `2px solid ${blue["A100"]}`, borderRadius:10 }}
            >
                <Button size="large" variant="outlined" href={ROUTES.login}><FormattedMessage id="login" /></Button>
                <Button size="large" variant="outlined" href={ROUTES.register}><FormattedMessage id="register" /></Button>
            </Grid>
        </Grid>
    )
}
export default AuthPage