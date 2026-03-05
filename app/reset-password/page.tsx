'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import PanelCardFormLayout from '@/src/components/auth/PanelCardFormLayout';
import CommonForm from '@/src/components/form/CommonForm';
import { ResetPasswordFormConfig } from '@/src/components/form/formConfigs';
import { useUpdatePassword } from '@/src/hooks/api';
import { AlertType } from '@/src/types/types';

export default function Page() {
  const [passwordForm, setPasswordForm] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [alert, setAlert] = useState<AlertType>(null);

  const router = useRouter();
  const { updatePassword } = useUpdatePassword();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const access_token = params.get('access_token');
    const type = params.get('type');

    if (access_token && type === 'recovery') {
      supabase.auth.setSession({ access_token });
    }
  }, []);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const { success, error } = updatePassword(passwordForm.password);

    if (error) {
      setAlert(error);
      return;
    }

    showAlert(success);
    router.push('/');
  };

  return (
    <PanelCardFormLayout
      alert={alert}
      setAlert={(v) => setAlert(v)}
      submit={{
        title: 'Actualizar',
        handler: handleSubmit,
      }}
    >
      <CommonForm
        fillForm={(form, isValid) => {
          setPasswordForm(form);
          setIsFormValid(isValid);
        }}
        formConfig={ResetPasswordFormConfig}
      />
    </PanelCardFormLayout>
  );
}
