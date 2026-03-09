import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';

import { SecondaryRoundIconButton } from '@/src/styledComponents';

type InviteDialogProps = {
  link: string;
  open: boolean;
  onClose: () => void;
};

export default function InviteDialog({
  link,
  open,
  onClose,
}: InviteDialogProps) {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setSnackbarOpen(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h6">Enlace de invitación</Typography>

            <IconButton onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="flex-s" spacing={3}>
            <Typography
              color="text.secondary"
              sx={{
                wordBreak: 'break-all',
                textAlign: 'center',
              }}
            >
              {link}
            </Typography>

            <SecondaryRoundIconButton disabled={copied} onClick={handleCopy}>
              <ContentCopyIcon fontSize="small" />
            </SecondaryRoundIconButton>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          Enlace copiado
        </Alert>
      </Snackbar>
    </>
  );
}
