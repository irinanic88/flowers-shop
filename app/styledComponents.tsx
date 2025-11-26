import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  textTransform: "none",
  padding: "5px 15px",
  borderRadius: "25px",
  fontWeight: 600,
  fontSize: "16px",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  padding: "5px 15px",
  fontWeight: 600,
  fontSize: "16px",
  transition: "0.3s",

  "&.Mui-disabled": {
    color: theme.palette.grey[400],
  },
}));

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});
