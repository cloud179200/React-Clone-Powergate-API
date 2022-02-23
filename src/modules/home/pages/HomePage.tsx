import { Button, Grid, Stack } from '@mui/material';
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
  const handleMoveToPhoto = useCallback(e => {
    dispatch(replace(ROUTES.photo))
  }, [dispatch])
  const handleMoveToUserDetail = useCallback(e => {
    dispatch(replace(ROUTES.userDetail))
  }, [dispatch])
  const handleMoveToDataTable = useCallback(e => {
    dispatch(replace(ROUTES.dataTable))
  }, [dispatch])
  return <Grid container direction="row"
    justifyContent="center"
    alignItems="center"
    width={1}
    height="100vh" columns={2}>
    <Grid container direction="row"
      justifyContent="space-evenly"
      alignItems="center" maxWidth="1280px" p={2} sx={{ border: `2px solid ${blue["A200"]}`, borderRadius: "20px" }} columns={12}>
      <Stack direction="row" spacing={4}>
        <Button variant='outlined' onClick={handleLogout}>Logout</Button>
        <Button variant='outlined' onClick={handleMoveToPhoto}>Move to photo</Button>
        <Button variant='outlined' onClick={handleMoveToUserDetail}>Move to user detail</Button>
        <Button variant='outlined' onClick={handleMoveToDataTable}>Move to data table</Button>
      </Stack>
    </Grid>
  </Grid>;
};

export default HomePage;
