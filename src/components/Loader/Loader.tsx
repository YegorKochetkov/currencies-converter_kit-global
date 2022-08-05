import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => (
  <CircularProgress
    data-testid="loader"
    sx={{
      position: "absolute",
      left: "47%",
      top: "50%",
    }}
  />
);
