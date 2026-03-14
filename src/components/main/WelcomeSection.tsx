import RedirectionLink from "@/src/components/common/RedirectionLink.tsx";
import { WelcomeBox } from "@/src/styledComponents.tsx";
import { Stack, Typography } from "@mui/material";
import React from "react";

export default function WelcomeSection({
  onLogin,
  onHelp,
}: {
  onLogin: () => void;
  onHelp: () => void;
}) {
  return (
    <WelcomeBox spacing={2} sx={{ mt: 2, height: "100%" }}>
      <Typography variant="h5">Bienvenido a Andrés Plant Select! 🌿</Typography>

      <Typography color="text.secondary">
        Aquí puedes explorar la lista de artículos disponibles, que se actualiza
        con cada nueva llegada.
      </Typography>

      <Typography color="text.secondary">
        Para ver los precios y realizar pedidos anticipados,
        <br />
        <RedirectionLink
          linkText=""
          linkTitle="Inicia sesión"
          onLinkClick={onLogin}
        />{" "}
        o <strong>regístrate con una invitación</strong>.
      </Typography>

      <RedirectionLink
        linkText="Primera vez aquí?"
        linkTitle="Aprende cómo funciona la aplicación →"
        onLinkClick={onHelp}
      />
    </WelcomeBox>
  );
}
