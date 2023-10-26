import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React from "react";
const menus = [
  {
    index: 0,
    link: "/dashboard",
    title: "DashBoard",
    icon: <DashboardIcon />,
  },
  {
    index: 1,
    link: "/dashboard/store",
    title: "Store",
    icon: <StoreIcon />,
  },
  {
    index: 2,
    link: "/dashboard/item",
    title: "Item",
    icon: <LocationOnIcon />,
  },
  {
    index: 3,
    link: "/dashboard/inventory",
    title: "Inventory",
    icon: <InventoryIcon/>,
  },
  {
    index: 4,
    link: "/dashboard/purchase",
    title: "Purchase",
    icon: <LocalShippingIcon />,
  },
  {
    index: 5,
    link: "/dashboard/user",
    title: "User",
    icon: <PeopleIcon />,
  },
 
];

function ListItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const handleClick = (event, index) => {
    setSelectedIndex(index);
  };
  return menus.map((menu, key) => (
    <ListItemButton
      sx={{
        "&.Mui-selected": {
          color: "#488550",
          backgroundColor: "#FFF",
          borderRadius: "21.5px",
        },
      }}
      selected={selectedIndex === menu.index}
      onClick={(event) => {
        const index = menu.index;
        navigate(menu.link);
        handleClick(event, index);
      }}
    >
      <ListItemIcon sx={{ color: selectedIndex === menu.index && "#488550" }}>
        {menu.icon}
      </ListItemIcon>
      <ListItemText primary={menu.title} />
    </ListItemButton>
  ));
}

export default ListItems;
