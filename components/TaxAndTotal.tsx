import React from 'react';
import Button from './Button';
import { ItemProps } from './ItemList';

function TaxAndTotal({ items }: ItemProps) {
  const itemTotal = () => {
    let sum = 0;

    for (let item of items) {
      sum += item.rate * item.hours;
    }

    return sum;
  };

  const salesTax = Math.round(itemTotal() * 0.04875);

  const totalAmount = () => {
    return (itemTotal() + salesTax).toFixed(2);
  };

  return (
    <>
      {items.length > 0 ? (
        <div>
          <div className='divide-y mt-8'>
            <div className='flex justify-between'>
              <div className='px-6 py-4 col-start-2'>Tax</div>
              <div className='px-6 py-4 text-right'>${salesTax}</div>
            </div>
            <div className='flex justify-between font-bold'>
              <div className='px-6 py-4'>Total</div>
              <div className='px-6 py-4 text-right'>${totalAmount()}</div>
            </div>
          </div>
          <div className='text-right mt-4'>
            <Button
              type='button'
              buttonText='Send Invoice'
              customStyle='!bg-none !border !text-slate-400 !py-2 !px-8 !font-normal hover:border-blue-400 !hover:bg-none hover:hue-rotate-0 !hover:shadow-md'
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default React.memo(TaxAndTotal);
