import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material"
import { Pagination, Typography, PaginationItem, Box } from "@mui/material"
import { blue } from "@mui/material/colors";

interface Props {
    page: number;
    totalRecord: number;
    totalPage: number;
    showing: IShowing;
    handleChangePage: (e: any, value: number) => void;
}
interface IShowing {
    from: number;
    to: number;
    numberRecord: number
}
const CustomPagination = (props: Props) => {
    const { page, totalRecord, totalPage, showing, handleChangePage } = props;
    return (<Box m={2} sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <Typography component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: "bold" }}
            variant="caption">{<>Showing {showing.from}-{showing.to} of {totalRecord} records</>}
        </Typography>
        <Pagination count={totalPage} page={page} onChange={handleChangePage} renderItem={(item) => (
            <PaginationItem sx={{
                borderRadius:"1rem",
                padding:"1.5rem 1.2rem",
                fontWeight:"bold",
                fontSize:"15px",
                color:blue[400],
                '&:hover': {
                    backgroundColor: blue[400],
                    borderColor: blue[500],
                    color:"white",
                    boxShadow: 'none',
                },
                '&:active': {
                    backgroundColor: blue[700],
                    borderColor: blue[700],
                    color:"white",
                    boxShadow: 'none',
                },
                '&:focus': {
                    boxShadow: `none`,
                },
                '&.Mui-selected':{
                    backgroundColor:blue[400],
                    color:"white"
                },
                '&.Mui-selected:hover':{
                    backgroundColor:blue[500],
                    color:"white"
                }
            }}
                components={{ previous: KeyboardDoubleArrowLeft, next: KeyboardDoubleArrowRight }}
                {...item}
            />
        )} />
    </Box>)
}

export default CustomPagination