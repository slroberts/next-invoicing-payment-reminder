import { ClientProps } from '../pages/dashboard';

export default function ClientInformation({ client }: ClientProps) {
  const { clientName, email, phoneNumber } = client;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return (
    <div className='md:pr-12'>
      <h2 className='font-semibold text-sm uppercase text-gray-800 whitespace-nowrap'>
        Client Information
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-1'>
        <div>
          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Name
          </h4>
          <p className='capitalize'>{clientName}</p>
        </div>
        <div>
          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Email
          </h4>
          <p>{email}</p>
        </div>
        <div>
          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Phone
          </h4>
          <p>{phoneNumber}</p>
        </div>
        <div>
          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Date
          </h4>
          <p>{today.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
