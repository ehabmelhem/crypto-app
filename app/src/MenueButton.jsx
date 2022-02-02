import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
export default function MenueButton({
  callBackFunc,
  setCompareCoins,
  currentCoin,
  compareCoins,
  coins,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddtoCompare = () => {
    setCompareCoins([...compareCoins, currentCoin]);
    handleClose();
  };
  const handleDeleteRow = () => {
    const new_coins = coins.filter((item) => {
      if (item.id !== currentCoin.id) {
        return item;
      }
    });
    callBackFunc([...new_coins]);
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleAddtoCompare}>Add to compare</MenuItem>
        <MenuItem onClick={handleDeleteRow}>Delete Row</MenuItem>
      </Menu>
    </div>
  );
}
