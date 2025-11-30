import Image from "next/image";
import { Box } from "@mui/material";

export default function Logo() {
  return (
    <Box sx={{ width: 100, height: 60, position: "relative" }}>
      <Image src="/logo.png" alt="Logo" fill style={{ objectFit: "contain" }} />
    </Box>
  );
}
