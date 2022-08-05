/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = {
  handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  selectValue: string,
  result: string,
}

export const Converter: React.FC<Props> = ({
  handleInputChange,
  selectValue,
  result,
}) => (
  <>
    <TextField
      id="outlined-basic"
      label='Input data in format "15 usd in uah"'
      variant="outlined"
      value={selectValue}
      onChange={(event) => handleInputChange(event)}
      fullWidth
      sx={{
        minWidth: 260,
      }}
    />
    <Typography
      variant="h6"
      gutterBottom
      component="div"
      sx={{
        m: 0,
      }}
    >
      {result}
    </Typography>
  </>
);
