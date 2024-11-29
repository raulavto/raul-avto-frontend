import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
  label?: string;
  inputClassName?: string;
  errorClassName?: string;
  classNameErrorIcon?: string;
  labelClassName?: string;
  [key: string]: any;
}

const InputField = ({
  label,
  inputClassName,
  errorClassName,
  classNameErrorIcon,
  labelClassName,
  ...props
}: InputFieldProps) => {
  const inputId = props.id || props.name;
  return (
    <>
      {label && (
        <label
          className={`block text-sm font-medium text-secondary mb-1 ${labelClassName}`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <Field
        id={inputId}
        className={`focus:outline-focus outline-none ${inputClassName}`}
        {...props}
      />
      <ErrorMessage name={props.name}>
        {(msg) => (
          <div className={errorClassName}>
            <span data-testid="error-message">{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </>
  );
};

export default InputField;
