import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Card, IconButton, Stack } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  border: "2px solid transparent",
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

export const ErrorButton = styled(PrimaryButton)(({ theme }) => ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[200],
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

export const Row = styled(Stack)({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const PanelCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  border: "1px solid",
  borderColor: theme.palette.grey[200],
  boxShadow: "none",
  padding: 16,
  width: "100%",
}));

export const RoundIconButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const SecondaryRoundIconButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}22`,
  transition: "0.2s",

  "&:hover": {
    backgroundColor: theme.palette.primary.main + "15",
    color: theme.palette.primary.dark,
    borderColor: theme.palette.primary.main,
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

export const WelcomeBox = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  margin: "32px auto 24px",
  padding: "24px",
  borderRadius: (theme.shape.borderRadius as number) * 2,
  backgroundColor: "rgba(200, 230, 201, 0.5)",
  border: "1px solid #c8e6c9",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",

  "& h5": {
    fontWeight: 600,
  },

  [theme.breakpoints.down("sm")]: {
    padding: "18px",
    margin: "24px auto 18px",
  },
}));
