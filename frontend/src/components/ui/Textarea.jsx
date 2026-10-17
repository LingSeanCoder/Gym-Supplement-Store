import clsx from 'clsx';
import { forwardRef } from 'react';

const Textarea = forwardRef(({ error, className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={clsx(
        'w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all',
        error ? 'border-red-500' : 'border-gray-300',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;