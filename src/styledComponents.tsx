import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Card, IconButton, Stack, Box } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  fontWeight: 600,
  fontSize: 14,
  padding: theme.spacing(0.7, 2.5),
  borderRadius: 999,
  border: `1px solid ${theme.palette.primary.main}`,

  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[200],
    border: `1px solid ${theme.palette.grey[200]}`,
    color: theme.palette.grey[400],
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  textTransform: "none",
  fontWeight: 600,
  fontSize: 14,
  padding: theme.spacing(0.7, 2.5),
  borderRadius: 999,
  border: `1px solid ${theme.palette.divider}`,
  transition: "background-color 0.2s ease, border-color 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.divider,
  },

  "&.Mui-disabled": {
    borderColor: theme.palette.grey[200],
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
  color: theme.palette.primary.contrastText,

  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
  },
}));

export const SecondaryRoundIconButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,

  borderRadius: "50%",
  backgroundColor: "transparent",
  color: theme.palette.text.secondary,

  border: `1px solid ${theme.palette.divider}`,

  transition: "background-color 0.2s ease, color 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },

  "&.Mui-disabled": {
    borderColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
  },
}));

export const CardEditButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5, 2),
  minWidth: "auto",
  borderRadius: 999,
  backgroundColor: "transparent",

  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(0.5),
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.secondary,
  },
}));

export const CardDeleteButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.error.main,
  padding: theme.spacing(0.5, 2),
  minWidth: "auto",
  borderRadius: 999,
  backgroundColor: "transparent",

  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(0.5),
  },

  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
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
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  "& h5": {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.25),
    marginBottom: theme.spacing(2),
  },
}));

export const FilterPillBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.2, 1.5),
  borderRadius: 999,
  border: "1px dashed",
  borderColor: theme.palette.text.secondary,
  transition: "border-color 0.2s ease, background-color 0.2s ease",
  overflow: "hidden",
  maxWidth: "100%",
}));
