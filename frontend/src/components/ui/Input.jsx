import clsx from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(({ error, className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        'w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all',
        error ? 'border-red-500' : 'border-gray-300',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;