import { Button, ButtonProps, Menu, MenuItem } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";

interface Props {
    menuItems?: Array<IMenuItem>,
    buttonLabel: string,
    buttonProps: ButtonProps
}
interface IMenuItem {
    label: string;
    onClick: () => void;
}
const ButtonWithMenu = (props: Props) => {
    const { menuItems, buttonProps, buttonLabel } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: any) => {
        setAnchorEl(e.target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <Box>
        <Button {...buttonProps} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>{buttonLabel}</Button>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            elevation={3}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {
                menuItems?.map((item) =>
                    <MenuItem key={item.label} onClick={item.onClick}>{item.label}</MenuItem>
                )
            }
        </Menu>
    </Box >
}

export default ButtonWithMenu