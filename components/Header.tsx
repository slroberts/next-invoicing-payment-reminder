import Link from 'next/link';

export default function Header() {
  return (
    <header className='py-6'>
      <Link href='/'>
        <a className='text-blue-500 font-bold uppercase'>
          Invoicing &amp; Payment Reminder
        </a>
      </Link>
    </header>
  );
}
