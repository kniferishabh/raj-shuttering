'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Send } from 'lucide-react';
import { Input, Textarea, Select } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import styles from './ContactForm.module.css';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = [
  'Residential',
  'Commercial',
  'Industrial',
  'Infrastructure',
  'Renovation',
  'Other',
];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', projectType: '', message: '' },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Failed to submit. Please try again.');
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (submitted) {
    return (
      <div className={styles.formCard}>
        <div className={styles.success} role="alert" aria-live="polite">
          <span className={styles.successIcon}>
            <CheckCircle2 size={32} />
          </span>
          <h3 className={styles.successTitle}>Thank You!</h3>
          <p className={styles.successText}>
            Your enquiry has been received. <br />
            We&apos;ll call you within 2 hours.
          </p>
          <Button variant="ghost" onClick={() => setSubmitted(false)}>
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)} noValidate>
      {!compact && (
        <>
          <h3 className={styles.title}>Send Us an Enquiry</h3>
          <p className={styles.subtitle}>
            Fill in the details below and we&apos;ll get back to you within 2 hours.
          </p>
        </>
      )}

      <div className={styles.row}>
        <Input
          label="Your Name"
          required
          placeholder="Ramesh Kumar"
          autoComplete="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Phone Number"
          required
          placeholder="9876543210"
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com (optional)"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Select
          label="Project Type"
          required
          defaultValue=""
          {...register('projectType')}
          error={errors.projectType?.message}
        >
          <option value="" disabled>Select project type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      </div>

      <Textarea
        label="Your Message"
        required
        placeholder="Tell us about your project, quantity needed, timeline, etc."
        rows={5}
        {...register('message')}
        error={errors.message?.message}
      />

      {submitError && <p className={styles.formError} role="alert">{submitError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
        icon={<Send size={16} />}
      >
        Send Enquiry
      </Button>
    </form>
  );
}
