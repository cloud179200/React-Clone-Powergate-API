import { Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { AppState } from "../../../redux/reducer";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux"
import Cookie from "js-cookie"
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { blue } from '@mui/material/colors';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
interface Props { }

const HomePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleLogout = useCallback((e) => {
    Cookie.remove(ACCESS_TOKEN_KEY);
    dispatch(replace(ROUTES.login))
  }, [dispatch])
  return <Grid container direction="row"
    justifyContent="center"
    alignItems="center"
    width={1}
    height="100vh" columns={2}><Grid container direction="row"
      justifyContent="center"
      alignItems="center" width={1} maxWidth="300px" p={3} sx={{border: `2px solid ${blue["A200"]}`, borderRadius:"20px"}} columns={6}><Button variant='outlined' onClick={handleLogout}>Logout</Button></Grid></Grid>;
};

export default HomePage;
