"use client";

import { JSX, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import * as R from "ramda";
import ProductsTab from "@/src/views/adminView/ProductsTab";
import PreordersTab from "@/src/views/adminView/PreordersTab";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

export default function AdminView() {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabs = [
    { label: "Productos", content: <ProductsTab /> },
    { label: "Preorders", content: <PreordersTab /> },
  ];

  const currentTab = R.nth(tab, tabs) ?? { label: "", content: null };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
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
