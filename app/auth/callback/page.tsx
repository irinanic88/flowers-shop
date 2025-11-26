'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState('Confirmando...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get('token');
    const type = params.get('type');
    const email = params.get('email');
    debugger;

    console.log('TOKEN:', token);
    console.log('TYPE:', type);
    console.log('EMAIL:', email);

    debugger;

    if (!token || !type || !email) {
      setTimeout(() => setMessage('Token inválido'), 0);
      return;
    }

    async function verify() {
      const { error } = await supabase.auth.verifyOtp({
        email: email as string,
        token: token as string,
        type: type as 'signup',
      });

      if (error) {
        console.error(error);
        setMessage('Ошибка подтверждения: ' + error.message);
      } else {
        setMessage('Email confirmado! Redirigiendo...');
        setTimeout(() => router.replace('/auth'), 1500);
      }
    }

    void verify();
  }, [router]);

  return <div style={{ padding: 20 }}>{message}</div>;
}
