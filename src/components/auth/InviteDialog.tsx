import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAlert } from '@/src/context/AlertContext';
import {
  SecondaryButton,
  SecondaryRoundIconButton,
} from '@/src/styledComponents';

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

  const { showAlert, clearAlert } = useAlert();

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
      showAlert({
        severity: 'success',
        message: 'Enlace copiado',
      });

      setTimeout(() => {
        setCopied(false);
        void clearAlert();
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography variant="h6">Enlace de invitación</Typography>
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
          <Stack alignItems="center" mt={2}>
            <SecondaryButton onClick={onClose}>Cerrar</SecondaryButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
