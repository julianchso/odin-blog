import { tv } from 'tailwind-variants';

const input = tv({
  base: 'm-2 p-2 rounded-md',
  variants: {
    variantSize: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variantSize?: 'sm' | 'md' | 'lg';
}

function Input({ id, variantSize = 'md', className, ...props }: InputProps) {
  return <input id={id} type='text' className={input({ variantSize, className })} {...props} />;
}

export default Input;
