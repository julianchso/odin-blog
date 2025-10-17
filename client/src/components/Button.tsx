import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'm-2 p-2 font-medium bg-blue-500 text-white rounded-md',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-purple-500 text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  type: React.ReactNode;
}

function Button({ children, size = 'sm', color = 'primary', type }: ButtonProps) {
  return (
    <button type={type} className={button({ size, color })}>
      {children}
    </button>
  );
}

export default Button;
