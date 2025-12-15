import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Card, IconButton, Stack } from '@mui/material';

export const PrimaryButton = styled(Button)(({ theme }) => ({
  border: '2px solid transparent',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  textTransform: 'none',
  padding: '5px 15px',
  borderRadius: '25px',
  fontWeight: 600,
  fontSize: '16px',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  border: '2px solid',
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  textTransform: 'none',
  padding: '5px 15px',
  fontWeight: 600,
  fontSize: '16px',
  transition: '0.3s',
  '&:hover': {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
  },
}));

export const Row = styled(Stack)({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const PanelCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: 'none',
  padding: 16,
  width: '100%',
}));

export const RoundIconButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
  },
}));

export const SecondaryRoundIconButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  transition: '0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.main + '15',
    color: theme.palette.primary.dark,
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-disabled': {
    borderColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
  },
}));

export const VisuallyHiddenInput = styled('input')({
  border: 0,
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

export const WelcomeBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  margin: '32px auto 24px',
  padding: '24px',
  borderRadius: (theme.shape.borderRadius as number) * 2,
  backgroundColor: theme.palette.secondary.main,
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',

  '& h5': {
    fontWeight: 600,
  },

  [theme.breakpoints.down('sm')]: {
    padding: '18px',
    margin: '24px auto 18px',
  },
}));
