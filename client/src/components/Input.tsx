import { tv } from 'tailwind-variants';

const input = tv({
  base: 'm-2 p-2 rounded-md',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
});

function Input() {
  return <input type='text' className={input({ size: 'md' })} />;
}

export default Input;
