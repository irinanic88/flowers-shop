import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type CommentBoxProps = {
  title: string;
  comment: string;
  color?: string;
};

export default function CommentBox({ title, comment, color }: CommentBoxProps) {
  return (
    <Accordion
      disableGutters
      square
      sx={{
        mt: 1,
        background: (theme) => color || theme.palette.secondary.main,
        borderRadius: 1.5,
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        sx={{ minHeight: 35, '& span': { m: 0 } }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {title}:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">{comment}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
