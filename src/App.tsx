/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
import React from "react";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
  const [tabs, setTab] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

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
              <Converter />
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
              <Selector />
              <RatesTable />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default App;
