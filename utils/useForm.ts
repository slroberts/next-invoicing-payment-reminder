import { useState, FormEventHandler, ChangeEventHandler } from 'react';

interface FormValues {
  [key: string]: any;
}

export default function useForm(callback: any, initialState = {}) {
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const toggleModal = () => {
    setOpen(!open);
    setFormValues(initialState);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    if (Object.keys(formValues).length !== 0) {
      setDisabled(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await callback();
    setFormValues(initialState);
    setOpen(false);
  };

  return {
    disabled,
    formValues,
    open,
    setOpen,
    toggleModal,
    handleInputChange,
    handleSubmit,
  };
}
