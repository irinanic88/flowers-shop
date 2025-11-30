"use client";

import { Stack } from "@mui/material";
import { useAuth } from "@/src/context/AuthContext";
import ProductsPage from "@/src/views/products/ProductsPage";
import Loader from "@/src/components/Loader";
import AdminView from "@/src/views/adminView/AdminView";
import UserView from "@/src/views/userView/UserView";
import {
  RoundIconButton,
  SecondaryRoundIconButton,
} from "@/src/styledComponents";
import LogoutIcon from "@mui/icons-material/Logout";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Layout from "@/src/components/Layout";

export default function Page() {
  const {
    name,
    isAdmin = false,
    isUser = false,
    isUnknownUser = true,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;

    if (
      hash.includes("error=access_denied") ||
      hash.includes("error_code=otp_expired")
    ) {
      window.history.replaceState(null, "", window.location.pathname);
      document.title = "APS";

      router.replace("/auth/signIn");
    }
  }, [router]);

  useEffect(() => {
    console.log("NAME is", name);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!useAuth) {
    return <Loader />;
  }

  return (
    <Layout
      actions={
        <Stack>
          {!isUnknownUser && (
            <SecondaryRoundIconButton onClick={handleSignOut}>
              <LogoutIcon fontSize="small" />
            </SecondaryRoundIconButton>
          )}
          {isUnknownUser && (
            <RoundIconButton onClick={() => router.push("/auth/signIn")}>
              <PersonIcon />
            </RoundIconButton>
          )}
        </Stack>
      }
    >
      {isAdmin && <AdminView />}
      {isUser && <UserView />}
      {isUnknownUser && <ProductsPage userRole="none" />}
    </Layout>
  );
}
