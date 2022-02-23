import { useCallback, useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { AppState } from "../../../redux/reducer"
import { Action } from "typesafe-actions"
import { fetchThunk } from "../../common/redux/thunk"
import { Button, CircularProgress, Grid, List, Stack } from "@mui/material"
import { setPhotos } from "../redux/dataReducer"
import { API_PATHS } from "../../../configs/api"
import { IPhoto } from "../../../models/data"
import CustomListItem from "../components/CustomListItem"
import { blue } from "@mui/material/colors"
import { ROUTES } from "../../../configs/routes"
import { replace } from "connected-react-router"
interface Props { }

const PhotoPage = (props: Props) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [clonePhotos, setClonePhotos] = useState<IPhoto[]>([])
    const { photos } = useSelector((state: AppState) => ({
        photos: state.data.photos,
    }))
    const isPhotosChanged = JSON.stringify(photos) !== JSON.stringify(clonePhotos)
    const getPhotos = useCallback(async () => {
        setLoading(true)
        const json = await dispatch(fetchThunk(API_PATHS.photo));
        setLoading(false)
        if (json) {
            dispatch(setPhotos(json.slice(0, 1000)))
        }
    }, [dispatch])

    useEffect(() => {
        getPhotos()
    }, [getPhotos])

    const setPhotoTitle = useCallback((id: number, value: string) => {
        setClonePhotos((prevState) => {
            const newPhotosByTutorComponent = Array.from(prevState);
            const indexToUpdate = newPhotosByTutorComponent.findIndex(item => item.id === id)
            const newPhoto = { ...newPhotosByTutorComponent[indexToUpdate], title: value }
            newPhotosByTutorComponent[indexToUpdate] = newPhoto
            return newPhotosByTutorComponent
        })
    }, [])
    const handleReset = () => {
        setClonePhotos([...photos])
    }
    const handleConfirm = () => {
        dispatch(setPhotos([...clonePhotos]))
    }
    const handleBackHome = () => {
        dispatch(replace(ROUTES.home))
    }
    useEffect(() => {
        setClonePhotos([...photos])
    }, [photos])
    return <Grid container direction="row"
        justifyContent="center"
        alignItems="center"
        width={1}
        height="100vh">
        <Grid container direction="row"
            justifyContent="center"
            alignItems="center" columns={2} width={0.8} maxWidth="1280px" p={2} m={2} sx={{ border: `2px solid ${blue["A200"]}`, borderRadius: "20px" }}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" columns={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                    <Button variant="outlined" onClick={handleBackHome}>Back Home</Button>
                    <Button disabled={!isPhotosChanged} variant="outlined" onClick={handleConfirm}>Confirm</Button>
                    <Button disabled={!isPhotosChanged} variant="outlined" onClick={handleReset}>Reset</Button>
                </Stack>
            </Grid>
            <Grid container direction="row" justifyContent="center" p={loading ? 4 : 0} alignItems="center" columns={12}>
                {loading ? <CircularProgress /> : <List sx={{ width: "100%" }}>
                    {clonePhotos?.map((item, index) =>
                            <CustomListItem {...item} key={index.toString()} multilineTitle={true} value={item.title} setPhotoTitle={setPhotoTitle} />
                    )}
                </List>}
            </Grid>
        </Grid>
    </Grid>;
}
export default PhotoPage