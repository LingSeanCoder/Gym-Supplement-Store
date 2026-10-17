import clsx from 'clsx';
import { forwardRef } from 'react';

const Select = forwardRef(({ error, children, className = '', ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={clsx(
        'w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all',
        error ? 'border-red-500' : 'border-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
export default Select;