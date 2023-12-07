import { Box, Card, Paper, Typography, styled } from "@mui/material";
import React from "react";

function ReportCard({ title, value, titleBackground, cardBackground }) {
  const styleCard = {
    height: "76px",
    width: "100%",
    backgroundColor: cardBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    color: "white",
  };
  const styleCardTitle = {
    width: "80%",
    marginBottom: -2,
    zIndex: 1000,
    color: "white",
    backgroundColor: titleBackground,
    borderRadius: "3px",
    position: "relative",
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={styleCardTitle}>
        <center>
          <Typography>{title}</Typography>
        </center>
      </Box>
      <Box sx={styleCard}>
        <Box>
          <Typography> {value}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default ReportCard;
