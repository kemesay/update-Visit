import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import logo from "./../../assets/images/visit_oromia_logo-removebg-preview.png";
import profileUrl from "./../../assets/images/profile-iconprofileIcon.png";
function index() {
  const ProfileIcon = () => (
    <img
      src={profileUrl}
      alg={"profile icon"}
      style={{
        width: "34px",
      }}
    />
  );
  return (
    <Stack
      sx={{
        borderRadius: "23px",
        backgroundColor: "#F2F2F2",
        paddingX: 2,
        paddingY: "0px",
      }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box>
        <img
          style={{ objectFit: "contain" }}
          src={logo}
          alt="logo"
          width={"93px"}
          height={"58px"}
        />
      </Box>
      <Box>
        <IconButton>
          <ProfileIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}

export default index;
