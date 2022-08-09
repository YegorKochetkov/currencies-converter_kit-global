/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { selectBaseCurrency, setBaseCurrency } from "../../redux/baseCurrencySlice";
import { useGetRatesQuery } from "../../redux/currenciesApi";
import { useAppSelector } from "../../redux/hooks";
import { Loader } from "../Loader/Loader";

export const Selector: React.FC = () => {
  const dispatch = useDispatch();
  const baseCurrency = localStorage.getItem("baseCurrency") || useAppSelector(selectBaseCurrency);

  const { data, isFetching } = useGetRatesQuery(baseCurrency);
  const currenciesNames = data && Object.keys(data.rates);

  const [selectedValue, setSelectedValue] = useState(baseCurrency);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    dispatch(setBaseCurrency(event.target.value));
  };

  return (
    <>
      {isFetching && <Loader />}
      <FormControl>
        <Select
          value={selectedValue}
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
    </>
  );
};
