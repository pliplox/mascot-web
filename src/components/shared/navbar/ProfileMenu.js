import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "@material-ui/core/";

const ProfileMenu = (props) => {
  const { handleProfileMenuClose, anchorEl } = props;
  const [openMenu, setOpenMenu] = useState(anchorEl);

  useEffect(() => {
    setOpenMenu(openMenu);
  }, [openMenu]);

  const handleMenuClose = () => {
    setOpenMenu(null);
    handleProfileMenuClose(null);
  };

  return (
    <Menu
      id="primary-search-account-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
