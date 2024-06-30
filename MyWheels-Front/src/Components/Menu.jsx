import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import PropTypes from 'prop-types';

export const CommonMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ backgroundColor: 'transparent', color: 'white', fontStyle: 'italic', fontFamily: 'sans-serif', fontWeight: 600 }}
            >
                {props.title}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                style={{ padding: 0 }}
            >
                <MenuItem onClick={handleClose}>{props.item1}</MenuItem>
                <MenuItem onClick={handleClose}>{props.item2}</MenuItem>
                <MenuItem onClick={handleClose}>{props.item3}</MenuItem>
            </Menu>
        </div>
    )
}
CommonMenu.propTypes = {
    title: PropTypes.string.isRequired,
    item1: PropTypes.string.isRequired,
    item2: PropTypes.string.isRequired,
    item3: PropTypes.string.isRequired
  };