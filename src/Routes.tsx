import { Suspense } from "react"
import { Switch, useLocation, Route } from "react-router-dom"
import { lazy } from "react"
import { ROUTES } from "./configs/routes"
import { CircularProgress, Grid } from "@mui/material";
import ProtectedRoute from "./modules/common/components/ProtectedRouter";
import AuthRoute from "./modules/common/components/AuthRoute";

const AuthPage = lazy(() => import("./modules/auth/pages/AuthPage"));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage'));
const HomePage = lazy(() => import("./modules/home/pages/HomePage"))
const ContactPage = lazy(() => import("./modules/home/pages/ContactPage"))
const PhotoPage = lazy(() => import("./modules/home/pages/PhotoPage"))
const PhotoDetailPage = lazy(() => import("./modules/home/pages/PhotoDetailPage"))
const UserDetailPage = lazy(() => import("./modules/home/pages/UserDetailPage"))
const DataTablePage = lazy(() => import("./modules/home/pages/DataTablePage"))

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
                <AuthRoute path={ROUTES.login} component={LoginPage} />
                <AuthRoute path={ROUTES.register} component={RegisterPage} />
                <ProtectedRoute path={ROUTES.home} component={HomePage} />
                <ProtectedRoute path={`${ROUTES.photo}/:id`} component={PhotoDetailPage} />
                <ProtectedRoute path={ROUTES.photo} component={PhotoPage} />
                <ProtectedRoute path={ROUTES.userDetail} component={UserDetailPage} />
                <ProtectedRoute path={ROUTES.dataTable} component={DataTablePage} />
                <Route path={ROUTES.contact} component={ContactPage} />
                <AuthRoute path="/" component={AuthPage} />
            </Switch>
        </Suspense>
    )
}

