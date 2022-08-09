/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useGetRatesQuery } from "../../redux/currenciesApi";
import { useAppSelector } from "../../redux/hooks";
import { selectBaseCurrency, setBaseCurrency } from "../../redux/baseCurrencySlice";
import { Loader } from "../Loader/Loader";
import useDebounce from "../../hooks/useDebounce";

export const Converter: React.FC = () => {
  const baseCurrency = useAppSelector(selectBaseCurrency);
  const dispatch = useDispatch();

  const { data, error, isFetching } = useGetRatesQuery(baseCurrency);
  const rates = data && Object.entries(data.rates);
  const currenciesNames = data && Object.keys(data.rates);

  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const debouncedInput = useDebounce(inputValue, 500);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!isCalculated) {
      setResult("");
    }

    if (isCalculated && event.target.value === "") {
      setResult("");
    }

    if (!error) {
      setInputValue(event.target.value.replace(/  +/g, " "));
    }
  };

  let errMsg = "";
  if (error) {
    if ("status" in error) {
      errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    }
  }

  useEffect(() => {
    if (error) {
      setResult(errMsg);
    }
  }, [error]);

  useEffect(() => {
    const inputWords = debouncedInput
      .trim()
      .split(" ")
      .filter((word) => word.toLowerCase() !== "in");

    let isValidInput = false;
    let amount = 0;
    let from = "";
    let fromRate = 0;
    let to = "";
    let toRate = 0;

    if (inputWords.length && currenciesNames) {
      amount = Number(inputWords[0]?.toUpperCase());
      from = inputWords[1]?.toUpperCase();
      to = inputWords[2]?.toUpperCase();

      isValidInput = amount > 0
        && currenciesNames.includes(from?.toUpperCase())
        && currenciesNames.includes(to?.toUpperCase());
    }

    if (isValidInput && rates) {
      rates.forEach((rate) => {
        if (rate[0] === from.toUpperCase()) {
          fromRate = rate[1];
        }

        if (rate[0] === to.toUpperCase()) {
          toRate = rate[1];
        }
      });

      let convertAmount = (+amount * toRate) / fromRate;

      convertAmount = (from !== baseCurrency && to !== baseCurrency)
        ? ((+amount * toRate) / fromRate)
        : convertAmount;

      setResult(`${amount} ${from} is equal to ${convertAmount.toFixed(3)} ${to}`);
      setIsCalculated(true);

      localStorage.setItem("baseCurrency", from);

      dispatch(setBaseCurrency(from));
    } else if (inputValue !== "") {
      setIsCalculated(false);
      setResult("Please, enter valid data");
    }
  }, [debouncedInput]);

  return (
    <>
      {isFetching && <Loader />}
      <TextField
        id="outlined-basic"
        label='Input data in format "15 usd in uah"'
        variant="outlined"
        value={inputValue}
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
};
