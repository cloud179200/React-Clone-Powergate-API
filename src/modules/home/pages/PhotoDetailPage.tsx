import { useParams } from "react-router-dom"
import { ThunkDispatch } from "redux-thunk"
import { AppState } from "../../../redux/reducer"
import { Action } from "typesafe-actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { IPhoto } from "../../../models/data"
import { ROUTES } from "../../../configs/routes"
import { replace } from "connected-react-router"
interface Props { }
const PhotoDetailPage = (props: Props) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
    const { photos } = useSelector((state: AppState) => ({
        photos: state.data.photos,
    }))
    const [photoDetail, setPhotoDetail] = useState<IPhoto>()
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const detail = photos.find(photo => photo.id === +id)
        if(!detail){
            dispatch(replace(ROUTES.photo))
            return
        }
        setPhotoDetail(detail)
    }, [])
    return <>{JSON.stringify(photoDetail)}</>
}
export default PhotoDetailPage