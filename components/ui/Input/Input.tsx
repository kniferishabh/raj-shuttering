import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.css';

interface BaseProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, required, id, className = '', ...rest },
  ref
) {
  const inputId = id || rest.name;
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={[styles.input, error ? styles.error : '', className].filter(Boolean).join(' ')}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      {hint && !error && <span id={`${inputId}-hint`} className={styles.hint}>{hint}</span>}
      {error && <span id={`${inputId}-error`} className={styles.errorText} role="alert">{error}</span>}
    </div>
  );
});

export type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, required, id, className = '', ...rest },
  ref
) {
  const inputId = id || rest.name;
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={[styles.textarea, error ? styles.error : '', className].filter(Boolean).join(' ')}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      {hint && !error && <span id={`${inputId}-hint`} className={styles.hint}>{hint}</span>}
      {error && <span id={`${inputId}-error`} className={styles.errorText} role="alert">{error}</span>}
    </div>
  );
});

export type SelectProps = BaseProps & SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, required, id, className = '', children, ...rest },
  ref
) {
  const inputId = id || rest.name;
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        className={[styles.select, error ? styles.error : '', className].filter(Boolean).join(' ')}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...rest}
      >
        {children}
      </select>
      {hint && !error && <span id={`${inputId}-hint`} className={styles.hint}>{hint}</span>}
      {error && <span id={`${inputId}-error`} className={styles.errorText} role="alert">{error}</span>}
    </div>
  );
});
