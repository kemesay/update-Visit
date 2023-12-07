import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { CardGiftcard, Hiking, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React from "react";
const menus = [
  {
    index: 0,
    link: "/dashboard/reports",
    title: "Reports",
    icon: <DashboardIcon />,
  },
  {
    index: 1,
    link: "/dashboard/destinantion",
    title: "Destination",
    icon: <LocationOnIcon />,
  },
  {
    index: 2,
    link: "/dashboard/tourist",
    title: "Tourist",
    icon: <PeopleIcon />,
  },
  {
    index: 3,
    link: "/dashboard/hotels",
    title: "Hotels",
    icon: <HotelIcon />,
  },
  { index: 4, 
    link: "/dashboard/banks", 
    title: "Banks", icon: <AccountBalanceIcon /> },
  {
    index: 5,
    link: "/dashboard/offices",
    title: "Offices",
    icon: <BusinessCenterIcon />,
  },
  {
    index: 6,
    link: "/dashboard/userManagement",
    title: "User management",
    icon: <ManageAccountsIcon />,
  },
  {
    index: 7,
    link: "/dashboard/tourOperator",
    title: "Tour Operator",
    icon: <Hiking />,
  },
  {
    index: 8,
    link: "/dashboard/packages",
    title: "Packages",
    icon: <CardGiftcard />,
  },
  {
    index: 9,
    link: "/dashboard/employee",
    title: "Employee",
    icon: <Person />,
  },
];

function ListItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
