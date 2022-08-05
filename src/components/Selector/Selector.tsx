/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppSelector } from "../../redux/hooks";
import { selectBaseCurrency } from "../../redux/baseCurrencySlice";
import { useGetRatesQuery } from "../../redux/currenciesApi";

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleSelectChange: (event: SelectChangeEvent) => void,
}

export const Selector: React.FC<Props> = ({ handleSelectChange }) => {
  const baseCurrency = useAppSelector(selectBaseCurrency);
  const { data } = useGetRatesQuery(baseCurrency);
  const currenciesNames = data && Object.keys(data.rates);

  return (
    <FormControl>
      <Select
        value={baseCurrency}
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
