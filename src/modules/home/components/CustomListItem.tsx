import { TextField, Typography, ListItem, ListItemAvatar, Avatar, Card, CardContent, CardMedia, Grid, CircularProgress } from "@mui/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { IPhoto } from "../../../models/photo";
import LazyLoad from 'react-lazyload'
import { blue, grey } from "@mui/material/colors";

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
    const inputRef = useRef<HTMLInputElement>()
    useEffect(() => {
        let mouted = true
        if (mouted === true && !isLabel === true) {
            inputRef.current?.focus()
        }
        return () => { mouted = false }
    }, [isLabel])
    return <LazyLoad key={id.toString()} placeholder={<Grid container p={4} columns={12} justifyContent="center" alignItems="center"><CircularProgress /></Grid>}>
        <ListItem sx={{ backgroundColor: id % 2 === 0 ? grey["500"] : "white" }} >
            <ListItemAvatar>
                <Avatar variant="square" sx={{ width: 40, height: 40 }} alt="" src={url} />
            </ListItemAvatar>
            <Card sx={{ width: 1, display: 'flex', flexDirection: "row" }} >
                <CardContent sx={{ display: "flex", flexDirection: "column", width: "calc(100% - 150px)" }}>
                    <Typography component="div" variant="h5">
                        {Date.now()}
                    </Typography>
                    {isLabel ?
                        <Typography sx={{ padding: "16.5px 14px", border: "1px solid", borderRadius: 1, height: "1.4375em", transition: "all 0.1s ease-out", "&:hover": { outline: `2px solid ${blue["700"]}`, cursor: "text" } }} variant="body1" component="label" onClick={() => setIsLabel(false)}>
                            {value}</Typography> :
                        <TextField inputRef={inputRef} sx={{ width: "100%" }} multiline={multilineTitle} maxRows={4} type="text" autoComplete="off" value={value} onChange={handleOnChange} onBlur={(e) => setIsLabel(true)} />}
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