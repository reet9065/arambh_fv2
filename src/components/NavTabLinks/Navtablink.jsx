import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import { NavLink, useLocation } from "react-router-dom";

function Navtablink({ tabs }) {

  const location = useLocation();
  const TabContext_value = () => {
    const tabIndex = tabs.findIndex((tab) => tab.to === location.pathname);
    return `${tabIndex+1}`;
  };

  const [value, setValue] = useState(TabContext_value());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: "1", borderColor: "divider", width: "100%" }}>
        <TabList onChange={handleChange}>
          {tabs.length > 0 &&
            tabs.map((tabItem, i) => {
              return (
                <Tab
                  key={i}
                  label={tabItem.label}
                  component={NavLink}
                  to={tabItem.to}
                  value={`${i + 1}`}
                />
              );
            })}
        </TabList>
      </Box>
    </TabContext>
  );
}

export default Navtablink;
