import { Suspense } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { lazy } from "react"
import { ROUTES } from "./configs/routes"
import { CircularProgress, Grid } from "@mui/material";
import ProtectedRoute from "./modules/common/components/ProtectedRouter";

const AuthPage = lazy(() => import("./modules/auth/pages/AuthPage"));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage'));
const HomePage = lazy(() => import("./modules/home/pages/HomePage"))
const ContactPage = lazy(() => import("./modules/home/pages/ContactPage"))

const LoadingPage = () => (<Grid container
    direction="row"
    justifyContent="center"
    alignItems="center" width={1} height="100vh">
    <CircularProgress />
</Grid>
)
interface Props { }
export const Routes = (props: Props) => {
    const location = useLocation()
    return (
        <Suspense fallback={<LoadingPage />}>
            <Switch location={location}>
                <Route path={ROUTES.login} component={LoginPage} />
                <Route path={ROUTES.register} component={RegisterPage} />
                <ProtectedRoute path={ROUTES.home} component={HomePage} />
                <Route path={ROUTES.contact} component={ContactPage} />
                <Route path="/" component={AuthPage} />
            </Switch>
        </Suspense>
    )
}

