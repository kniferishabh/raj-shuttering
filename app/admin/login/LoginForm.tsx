'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import styles from './login.module.css';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export function LoginForm({ error, callbackUrl }: { error?: string; callbackUrl?: string }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(
    error ? 'Invalid username or password' : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setSubmitError('Invalid username or password');
      return;
    }

    router.push(callbackUrl || '/admin');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <Input
        label="Username"
        autoComplete="username"
        autoFocus
        {...register('username')}
        error={errors.username?.message}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
      />

      {submitError && (
        <p className={styles.error} role="alert">
          <AlertCircle size={14} /> {submitError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting} icon={<LogIn size={16} />}>
        Sign In
      </Button>
    </form>
  );
}
