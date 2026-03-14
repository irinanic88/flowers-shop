import React from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

export function getMenuActions({
  isAdmin,
  openUser,
  openInvite,
}: {
  isAdmin: boolean;
  openUser: () => void;
  openInvite: () => void;
}) {
  return [
    {
      value: "invite",
      label: "Crear invitación",
      icon: <PersonAddAlt1Icon fontSize="small" />,
      visibility: isAdmin,
      onClick: openInvite,
    },
    {
      value: "edit",
      label: "Editar perfil",
      icon: <EditIcon fontSize="small" />,
      visibility: true,
      onClick: openUser,
    },
    {
      value: "logout",
      label: "Salir",
      icon: <LogoutIcon fontSize="small" />,
      visibility: true,
      onClick: async () => {
        await supabase.auth.signOut();
      },
    },
  ];
}
