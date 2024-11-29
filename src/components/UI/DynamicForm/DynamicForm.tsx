'use client';
import { Formik, Form, FormikProps } from 'formik';

export interface DynamicFormProps<T> {
  initialValues: T;
  validationSchema?: any;
  onSubmit: (values: T, formikHelpers: { resetForm: () => void }) => void;
  children:
    | React.ReactNode
    | ((formikProps: FormikProps<any>) => React.ReactNode);
  enableReinitialize?: boolean;
}

const DynamicForm = <T,>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  enableReinitialize = false,
}: DynamicFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <Form>
          {typeof children === 'function' ? children(formikProps) : children}
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
