import Image from 'next/image';
import Item from './Item';

export type ItemProps = {
  [key: string]: string | any;
};

export default function ItemList({ items }: ItemProps) {
  return (
    <>
      {items.length > 0 ? (
        <>
          <table className='w-full min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr className='grid grid-cols-4'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Item
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Rate
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hours
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {items.map((item: any) => (
                <Item key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <figure className='text-center opacity-20'>
          <Image
            src='/images/undraw_fill_in_mie5.svg'
            alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
            width={520}
            height={380}
            priority
          />
        </figure>
      )}
    </>
  );
}
