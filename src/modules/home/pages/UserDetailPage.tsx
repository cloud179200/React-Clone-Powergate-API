import { faFemale, faMale, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import { blue, brown, pink } from "@mui/material/colors";
import { replace } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";


interface Props { }
const UserDetailPage = (props: Props) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: AppState) => ({
        user: state.profile.user,
    }));

    return (
        <Grid container width={1} height="100vh" columns={2} direction="row" justifyContent="space-evenly" alignItems="center" sx={{ backgroundColor: brown["100"] }}>
            <Grid item columns={6} justifyContent="center" alignItems="center">
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ width: 56, height: 56 }} src="https://s.memehay.com/files/posts/20200911/anh-kha-banh-khoc-9ee9b0b183d53ab0501771951e06bc3d.jpg" />
                        }
                        action={
                            user?.gender === "male" ? <FontAwesomeIcon icon={faMars} size="2x" color={blue["800"]} /> : <FontAwesomeIcon icon={faVenus} size="2x" color={pink["400"]} />
                        }
                        title={user?.name}
                        subheader={user?.email}
                    />
                    <CardMedia
                        component="img"
                        height="433"
                        image="https://i.pinimg.com/564x/11/f0/b9/11f0b9c79c246849833cfbb1fcfa3d39.jpg"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Ngày tạo: {user?.createdAt}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item columns={6} justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={() => dispatch(replace(ROUTES.home))}>Back to home</Button>
            </Grid>

        </Grid>

    );
}
export default UserDetailPage