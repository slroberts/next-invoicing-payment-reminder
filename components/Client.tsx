import { ClientProps } from '../pages/dashboard';
import Button from './Button';

export default function Client({ client }: ClientProps) {
  return (
    <div
      key={client.id}
      className=' min-w-min text-center border p-8 rounded-sm'
    >
      <h3 className='text-lg font-semibold'>{client.name}</h3>

      <Button
        buttonText='Generate Invoice'
        type='button'
        customStyle='!bg-none !border !text-slate-400 !text-sm !tracking-wide !mt-4 !py-2 !px-6 !font-normal !hover:bg-none hover:border-blue-400 hover:hue-rotate-0 '
      />
    </div>
  );
}
