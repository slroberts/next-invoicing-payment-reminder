import { useFetch } from '../utils/useFetch';
import { ItemProps } from './ItemList';

export default function Item({ item }: ItemProps) {
  const { fetcher } = useFetch('DELETE', '/api/item', item);

  return (
    <tr className='grid grid-cols-4 pb-2 text-sm'>
      <td className='px-6 py-4 capitalize'>{item.itemName}</td>
      <td className='px-6 py-4'>{item.rate}</td>
      <td className='px-6 py-4'>{item.hours}</td>
      <td className='px-6 py-4 text-indigo-600 hover:text-indigo-900 text-right font-semibold cursor-pointer'>
        <div onClick={() => fetcher()}>Delete</div>
      </td>
    </tr>
  );
}
