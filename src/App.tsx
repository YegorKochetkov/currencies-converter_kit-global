/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import { useGetRatesQuery } from "./redux/currenciesApi";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectBaseCurrency, setBaseCurrency } from "./redux/baseCurrencySlice";
import { Loader } from "./components/Loader/Loader";
import { Converter } from "./components/Converter/Converter";
import { Selector } from "./components/Selector/Selector";
import { RatesTable } from "./components/RatesTable/RatesTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const dispatch = useAppDispatch();
  const baseCurrency = useAppSelector(selectBaseCurrency);

  const [selectValue, setSelectValue] = useState("");
  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(setBaseCurrency(event.target.value));
  };

  const { data, isFetching, error } = useGetRatesQuery(baseCurrency);
  const rates = data && Object.entries(data.rates);
  const currenciesNames = data && Object.keys(data.rates);

  const [tabs, setTab] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  const [result, setResult] = useState("Please, enter valid data");
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectValue(event.target.value);
  };

  let errMsg = "";
  let errStatus = "";
  if (error) {
    if ("status" in error) {
      errStatus = error.status.toString();
      errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    }
  }

  useEffect(() => {
    const inputWords = selectValue.trim().split(" ").filter((word) => word !== "in");
    let amount = 0;
    let from = "";
    let fromRate = 0;
    let to = "";
    let toRate = 0;
    let isValidInput = false;

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

      let convertAmount = from.toUpperCase() === baseCurrency
        ? (+amount * fromRate * toRate)
        : ((+amount * fromRate) / toRate);

      convertAmount = (from.toUpperCase() !== baseCurrency && to.toUpperCase() !== baseCurrency)
        ? ((+amount * toRate) / fromRate)
        : convertAmount;
      setResult(`${amount} ${from} is equal to ${convertAmount.toFixed(3)} ${to}`);
    } else {
      setResult("Please, enter valid data");
    }

    if (errStatus === "429") {
      setResult(errMsg);
    }
  }, [selectValue]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        "& > :not(style)": {
          m: 1,
          width: "50%",
          minWidth: "min-content",
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ position: "relative" }}>
          {isFetching && <Loader />}

          <Tabs value={tabs} onChange={handleTabChange} aria-label="app tabs">
            <Tab label="Converter" {...a11yProps(0)} />
            <Tab label="Rates" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={tabs} index={0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Converter
                selectValue={selectValue}
                result={result}
                handleInputChange={handleInputChange}
              />
            </Box>
          </TabPanel>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <TabPanel value={tabs} index={1}>
              <Selector handleSelectChange={handleSelectChange} />
              <RatesTable />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default App;
