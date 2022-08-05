/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectBaseCurrency, setBaseCurrency } from "../../redux/baseCurrencySlice";
import { useGetRatesQuery } from "../../redux/currenciesApi";

export const Selector: React.FC = () => {
  const dispatch = useDispatch();
  const baseCurrency = useAppSelector(selectBaseCurrency);
  const { data } = useGetRatesQuery(baseCurrency);
  const currenciesNames = data && Object.keys(data.rates);

  const [selectValue, setSelectValue] = useState(localStorage.getItem("baseCurrency") || "");
  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(setBaseCurrency(event.target.value));
    setSelectValue(event.target.value);
  };

  return (
    <FormControl>
      <Select
        value={selectValue}
        onChange={handleSelectChange}
        inputProps={{ "aria-label": "Without label" }}
      >
        {currenciesNames?.map((currency) => (
          <MenuItem
            value={currency}
            key={currency}
          >
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
