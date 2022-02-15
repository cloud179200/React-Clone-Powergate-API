import { TextField, Typography, ListItem, ListItemAvatar, Avatar, Card, CardContent, CardMedia, Grid, CircularProgress } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { IPhoto } from "../../../models/photo";
import LazyLoad from 'react-lazyload'

interface Props extends IPhoto {
    value: string;
    setPhotoTitle: (index: number, value: string) => void;
    multilineTitle: boolean;
    index: number;
}
const CustomListItem = (props: Props) => {
    const { value, setPhotoTitle, url, thumbnailUrl, multilineTitle, id, index } = props
    const [isLabel, setIsLabel] = useState(true)
    const handleOnChange = useCallback((e) => {
        setPhotoTitle(index, e.target.value)
    }, [setPhotoTitle, index])
    return <LazyLoad key={id.toString()} placeholder={<Grid container p={4} columns={12} justifyContent="center" alignItems="center"><CircularProgress /></Grid>}>
        <ListItem>
            <ListItemAvatar>
                <Avatar variant="square" sx={{ width: 40, height: 40 }} alt="" src={url} />
            </ListItemAvatar>
            <Card sx={{ width: 1, display: 'flex', flexDirection: "row" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", width: "calc(100% - 150px)" }}>
                    <Typography component="div" variant="h5">
                        {Date.now()}
                    </Typography>
                    {isLabel ?
                        <Typography sx={{ padding: "16.5px 14px", border: "1px solid rgba(25, 118, 210, 0.5)", borderRadius: 1,height:"1.4375em" }} variant="body1" component="label" onClick={() => setIsLabel(false)}>
                            {value}</Typography> :
                        <TextField sx={{ width: "100%" }} multiline={multilineTitle} maxRows={4} type="text" autoComplete="off" value={value} onBlur={(e) => setIsLabel(true)} onChange={handleOnChange} focused={true} />}
                </CardContent>
                <CardMedia
                    sx={{ width: 150 }}
                    component="img"
                    image={thumbnailUrl}
                    alt={thumbnailUrl}
                />
            </Card>
        </ListItem></LazyLoad >
}
export default memo(CustomListItem)