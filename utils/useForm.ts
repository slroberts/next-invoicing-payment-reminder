import { useState, FormEventHandler, ChangeEventHandler } from 'react';

interface FormValues {
  [key: string]: any;
}

export default function useForm(callback: any, initialState = {}) {
  const [formValues, setFormValues] = useState<FormValues>(initialState);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await callback();
    setFormValues(initialState);
  };

  return { formValues, handleInputChange, handleSubmit };
}
