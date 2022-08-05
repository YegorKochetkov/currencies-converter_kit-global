import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => (
  <CircularProgress
    sx={{
      position: "absolute",
      left: "47%",
      top: "50%",
    }}
  />
);
