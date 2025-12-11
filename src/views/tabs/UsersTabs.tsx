"use client";

import React, { JSX, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import * as R from "ramda";
import ProductsTab from "@/src/views/tabs/ProductsTab";
import PreordersTab from "@/src/views/tabs/PreordersTab";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

export default function UsersTabs() {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabs = [
    { label: "Productos", content: <ProductsTab /> },
    { label: "Preordenado", content: <PreordersTab /> },
  ];

  const currentTab = R.nth(tab, tabs) ?? { label: "", content: null };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tab} onChange={handleChange}>
        {R.addIndex<TabItem, JSX.Element>(R.map)(
          (t, i) => (
            <Tab key={i} label={t.label} />
          ),
          tabs,
        )}
      </Tabs>
      <Box sx={{ mt: 2 }}>{currentTab.content}</Box>
    </Box>
  );
}
