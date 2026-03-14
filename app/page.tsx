"use client";

import InviteDialog from "@/src/components/auth/InviteDialog.tsx";
import HeaderActions from "@/src/components/main/HeaderActions.tsx";
import UserMenu from "@/src/components/main/UserMenu.tsx";
import WelcomeSection from "@/src/components/main/WelcomeSection.tsx";
import { getMenuActions } from "@/src/helpers/helpers.tsx";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import Layout from "@/src/components/common/Layout";
import Loader from "@/src/components/common/Loader";
import { useAuth } from "@/src/context/AuthContext";
import AuthView from "@/src/views/AuthView";
import HelpView from "@/src/views/HelpView";
import UpdateUserView from "@/src/views/UpdateUserView";
import UsersTabs from "@/src/views/UsersTabs";
import UserView from "@/src/views/UserView";

export default function Page() {
  const [dialogs, setDialogs] = useState({
    user: false,
    auth: false,
    help: false,
    invite: false,
  });

  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  const {
    loading,
    name,
    isAdmin = false,
    isUser = false,
    isUnknownUser = true,
  } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;

    if (
      hash.includes("error=access_denied") ||
      hash.includes("error_code=otp_expired")
    ) {
      window.history.replaceState(null, "", window.location.pathname);
      document.title = "APS";
    }
  }, []);

  const openDialog = (key: keyof typeof dialogs) =>
    setDialogs((prev) => ({ ...prev, [key]: true }));

  const closeDialog = (key: keyof typeof dialogs) =>
    setDialogs((prev) => ({ ...prev, [key]: false }));

  if (loading) {
    return <Loader />;
  }

  const fetchUrl = async () => {
    const { data } = await supabase.functions.invoke("create-invite");

    if (data) {
      setInviteUrl(data.inviteUrl);
    }
  };

  const actions = getMenuActions({
    isAdmin,
    openUser: () => openDialog("user"),
    openInvite: async () => {
      await fetchUrl();
      openDialog("invite");
    },
  });

  return (
    <Layout
      actions={
        <HeaderActions
          name={name}
          isUnknownUser={isUnknownUser}
          onLogin={() => openDialog("auth")}
          actions={actions}
        />
      }
    >
      {isAdmin && <UsersTabs />}
      {isUser && <UserView />}

      {isUnknownUser && (
        <WelcomeSection
          onLogin={() => openDialog("auth")}
          onHelp={() => openDialog("help")}
        />
      )}

      {/* dialogs */}
      {dialogs.user && (
        <UpdateUserView open onClose={() => closeDialog("user")} />
      )}

      {dialogs.auth && <AuthView open onClose={() => closeDialog("auth")} />}

      {dialogs.help && <HelpView open onClose={() => closeDialog("help")} />}

      {dialogs.invite && (
        <InviteDialog
          link={inviteUrl}
          open={open}
          onClose={() => closeDialog("invite")}
        />
      )}
    </Layout>
  );
}
