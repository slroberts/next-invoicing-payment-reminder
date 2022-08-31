import { forwardRef, Ref } from 'react';

type ButtonProps = {
  type: 'submit' | 'button';
  buttonText: string;
  customStyle?: string;
  onClick?: () => any;
};

const Button = forwardRef(
  (
    { type, buttonText, customStyle, onClick }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        onClick={onClick}
        className={`px-10 py-3 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:-hue-rotate-60 transition-colors ${customStyle}`}
      >
        {buttonText}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
