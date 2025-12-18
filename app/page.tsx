"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useAuth } from "@/src/context/AuthContext";
import ProductsPage from "@/src/components/products/ProductsPage";
import Loader from "@/src/components/Loader";
import UserView from "@/src/views/UserView";
import {
  RoundIconButton,
  SecondaryRoundIconButton,
  WelcomeBox,
} from "@/src/styledComponents";
import LogoutIcon from "@mui/icons-material/Logout";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Layout from "@/src/components/Layout";
import UsersTabs from "@/src/views/UsersTabs";

export default function Page() {
  const {
    loading,
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout
      actions={
        <Stack>
          {!isUnknownUser && (
            <Stack spacing={1} alignItems="flex-end">
              <Typography variant="body1" color="primary">
                Hola, {name}!
              </Typography>
              <SecondaryRoundIconButton onClick={handleSignOut}>
                <LogoutIcon fontSize="small" />
              </SecondaryRoundIconButton>
            </Stack>
          )}
          {isUnknownUser && (
            <RoundIconButton onClick={() => router.push("/auth/signIn")}>
              <PersonIcon />
            </RoundIconButton>
          )}
        </Stack>
      }
    >
      {isAdmin && <UsersTabs />}
      {isUser && <UserView />}
      {isUnknownUser && (
        <Box>
          <WelcomeBox spacing={2}>
            <Typography variant="h5" color="text.primary">
              ¡Bienvenido a Andrés Plant Select! 🌿
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Esta aplicación fue creada para que nuestra comunicación sea más
              simple y cómoda.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Ahora puedes{" "}
              <strong>explorar la lista de productos disponibles</strong>, que
              se actualiza con cada nueva llegada.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Si quieres{" "}
              <strong>ver los precios y realizar un pedido anticipado</strong>,
              por favor <strong>regístrate</strong> o{" "}
              <strong>inicia sesión</strong>.
            </Typography>
          </WelcomeBox>

          <ProductsPage />
        </Box>
      )}
    </Layout>
  );
}
