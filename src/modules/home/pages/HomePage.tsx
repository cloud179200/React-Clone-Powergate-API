import { Button, Grid } from '@mui/material';
import { useCallback } from 'react';
import { AppState } from "../../../redux/reducer";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux"
import Cookie from "js-cookie"
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { blue } from '@mui/material/colors';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { removeUserInfo } from '../../auth/redux/authReducer';
interface Props { }

const HomePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleLogout = useCallback((e) => {
    Cookie.remove(ACCESS_TOKEN_KEY);
    dispatch(removeUserInfo());
    dispatch(replace(ROUTES.login))
  }, [dispatch])
  const handleMoveToTutorial = useCallback(e => {
    dispatch(replace(ROUTES.tutorial))
  }, [dispatch])
  const handleMoveToUserDetail = useCallback(e => {
    dispatch(replace(ROUTES.userdetail))
  }, [dispatch])
  return <Grid container direction="row"
    justifyContent="center"
    alignItems="center"
    width={1}
    height="100vh" columns={2}>
    <Grid container direction="row"
      justifyContent="space-evenly"
      alignItems="center" width={1} maxWidth="600px" p={2} sx={{ border: `2px solid ${blue["A200"]}`, borderRadius: "20px" }} columns={12}>
      <Button variant='outlined' onClick={handleLogout}>Logout</Button>
      <Button variant='outlined' onClick={handleMoveToTutorial}>Move to tutorial</Button>
      <Button variant='outlined' onClick={handleMoveToUserDetail}>Move to user detail</Button>
    </Grid>
  </Grid>;
};

export default HomePage;
