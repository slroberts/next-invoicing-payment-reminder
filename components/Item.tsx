import Router from 'next/router';
import { ItemProps } from './ItemList';

export default function Item({ item }: ItemProps) {
  const deleteItem = async (item: {}) => {
    try {
      await fetch('/api/item', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      Router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className='grid grid-cols-4 pb-2 text-sm'>
      <td className='px-6 py-4 capitalize'>{item.itemName}</td>
      <td className='px-6 py-4'>{item.rate}</td>
      <td className='px-6 py-4'>{item.hours}</td>
      <td className='px-6 py-4 text-indigo-600 hover:text-indigo-900 text-right font-semibold cursor-pointer'>
        <div onClick={() => deleteItem(item)}>Delete</div>
      </td>
    </tr>
  );
}
