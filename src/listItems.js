import React, { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import { useNavigate } from "react-router-dom";

const menus = [
  {
    index: 0,
    link: "/dashboard/store",
    title: "Store",
    icon: <DashboardIcon />,
    roles: ["ADMIN", "STOREMANAGER", "STORE_STAFF"],
  },
  {
    index: 1,
    link: "/dashboard/item",
    title: "Item",
    icon: <LocationOnIcon />,
    roles: ["STOREMANAGER", "STORE_STAFF"],
  },
  {
    index: 2,
    link: "/dashboard/inventory",
    title: "Inventory",
    icon: <PeopleIcon />,
    roles: ["ADMIN","STOREMANAGER", "STORE_STAFF"],
  },
  {
    index: 3,
    link: "/dashboard/purchase",
    title: "Purchase",
    icon: <HotelIcon />,
    roles: ["ADMIN", "STOREMANAGER"],
  },
  {
    index: 4,
    link: "/dashboard/user",
    title: "User",
    icon: <PeopleIcon />,
    roles: ["ADMIN"],
  },
];

function ListItems() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"))
  const navigate = useNavigate();

  useEffect(() => {
    // Filter menu items based on the user's role
    if (role) {
      setRole(role)
      setFilteredMenus(
        menus.filter((menu) => menu.roles.includes(role))
      );
    }
  }, [role]);

  const handleClick = (event, index) => {
    setSelectedIndex(index);
  };

  return filteredMenus.map((menu, key) => (
    <ListItemButton
      key={key}
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
