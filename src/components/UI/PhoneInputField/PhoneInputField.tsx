'use client';

import { ErrorMessage, useField } from 'formik';
import { formatUkrainePhoneInput } from '@/utils/phoneMask';

interface PhoneInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
}

const PhoneInputField = ({
  name,
  label,
  placeholder,
  inputClassName,
  errorClassName,
  labelClassName,
}: PhoneInputFieldProps) => {
  const [field, , helpers] = useField(name);

  return (
    <>
      {label && (
        <label
          className={`block text-sm font-medium text-secondary mb-1 ${labelClassName}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type="tel"
        name={field.name}
        value={field.value}
        placeholder={placeholder}
        onBlur={field.onBlur}
        onChange={(event) => {
          helpers.setValue(formatUkrainePhoneInput(event.target.value));
        }}
        className={`focus:outline-focus outline-none ${inputClassName}`}
        inputMode="tel"
        autoComplete="tel"
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div className={errorClassName}>
            <span data-testid="error-message">{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </>
  );
};

export default PhoneInputField;
