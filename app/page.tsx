'use client';

import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import AuthForm from '@/src/components/auth/AuthForm';
import InviteDialog from '@/src/components/auth/InviteDialog';
import Layout from '@/src/components/common/Layout';
import Loader from '@/src/components/common/Loader';
import RedirectionLink from '@/src/components/common/RedirectionLink';
import ProductsPage from '@/src/components/products/ProductsPage';
import { useAuth } from '@/src/context/AuthContext';
import {
  RoundIconButton,
  SecondaryRoundIconButton,
  WelcomeBox,
} from '@/src/styledComponents';
import UpdateUserView from '@/src/views/UpdateUserView';
import UsersTabs from '@/src/views/UsersTabs';
import UserView from '@/src/views/UserView';

export default function Page() {
  const [openUserForm, setOpenUserForm] = useState(false);
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const openSelect = Boolean(anchorEl);

  const {
    loading,
    name,
    isAdmin = false,
    isUser = false,
    isUnknownUser = true,
  } = useAuth();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;

    if (
      hash.includes('error=access_denied') ||
      hash.includes('error_code=otp_expired')
    ) {
      window.history.replaceState(null, '', window.location.pathname);
      document.title = 'APS';
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  const fetchUrl = async () => {
    const { data } = await supabase.functions.invoke('create-invite');

    if (data) {
      setInviteUrl(data.inviteUrl);
    }
  };

  const actions = [
    {
      value: 'invite',
      label: 'Crear invitacion',
      icon: <PersonAddAlt1Icon fontSize="small" />,
      onClick: () => {
        void fetchUrl();
        setOpenInviteDialog(true);
      },
      visibility: isAdmin,
    },
    {
      value: 'edit',
      label: 'Editar perfil',
      icon: <EditIcon fontSize="small" />,
      onClick: () => setOpenUserForm(true),
      visibility: true,
    },
    {
      value: 'logout',
      label: 'Salir',
      icon: <LogoutIcon fontSize="small" />,
      onClick: async () => {
        await supabase.auth.signOut();
      },
      visibility: true,
    },
  ];

  return (
    <Layout
      actions={
        <Stack>
          {!isUnknownUser && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" color="primary">
                Hola, {name}!
              </Typography>
              <>
                <SecondaryRoundIconButton
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <MenuIcon fontSize="small" />
                </SecondaryRoundIconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openSelect}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  {actions
                    .filter(({ visibility }) => visibility)
                    .map(({ value, label, icon, onClick }) => (
                      <MenuItem
                        key={value}
                        onClick={() => {
                          onClick();
                          setAnchorEl(null);
                        }}
                      >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{label}</ListItemText>
                      </MenuItem>
                    ))}
                </Menu>
              </>
            </Stack>
          )}
          {isUnknownUser && (
            <RoundIconButton onClick={() => setOpenAuthForm(true)}>
              <PersonIcon />
            </RoundIconButton>
          )}
        </Stack>
      }
    >
      {isAdmin && <UsersTabs />}
      {isUser && <UserView />}
      {isUnknownUser && (
        <Stack sx={{ width: '100%' }} alignItems="center">
          <WelcomeBox spacing={2} sx={{ mt: 2 }}>
            <Typography variant="h5" color="text.primary">
              Bienvenido a Andrés Plant Select! 🌿
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Aquí puedes explorar la lista de artículos disponibles, que se
              actualiza con cada nueva llegada.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Para ver los precios y realizar pedidos anticipados,{' '}
              <RedirectionLink
                linkText={''}
                linkTitle={'Inicia session'}
                onLinkClick={() => setOpenAuthForm(true)}
              />{' '}
              o <strong>regístrate con una invitación</strong>.
            </Typography>

            <RedirectionLink
              linkText={'Primera vez aquí?'}
              linkTitle={'Aprende cómo funciona la aplicación'}
              onLinkClick={() => {}}
            />
          </WelcomeBox>

          <ProductsPage />
        </Stack>
      )}

      {openUserForm && (
        <UpdateUserView
          open={openUserForm}
          onClose={() => setOpenUserForm(false)}
        />
      )}

      {openAuthForm && (
        <AuthForm open={openAuthForm} onClose={() => setOpenAuthForm(false)} />
      )}

      {openInviteDialog && inviteUrl && (
        <InviteDialog
          link={inviteUrl}
          open={openInviteDialog}
          onClose={() => {
            setOpenInviteDialog(false);
            setInviteUrl('');
          }}
        />
      )}
    </Layout>
  );
}
