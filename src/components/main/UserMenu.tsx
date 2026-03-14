"use client";

import { UserMenuProps } from "@/src/types/propsTypes";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

export default function UserMenu({
  anchorEl,
  onClose,
  actions,
}: UserMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {actions
        .filter(({ visibility }) => visibility)
        .map(({ value, label, icon, onClick }) => (
          <MenuItem
            key={value}
            onClick={() => {
              onClick();
              onClose();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
    </Menu>
  );
}
