import { Fragment, useRef, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './Button';

export type ModalProps = {
  open: boolean;
  setOpen: any;
  modalTitle: string;
  children: ReactNode;
};

export default function Modal({
  open,
  setOpen,
  modalTitle,
  children,
}: ModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto flex justify-center items-center min-h-screen'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <Dialog.Panel className=' bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:max-w-xl mx-6 px-4 pb-8'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='mt-3'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-medium text-gray-400'
                  >
                    {modalTitle}
                  </Dialog.Title>
                  <div className='mt-4'>{children}</div>
                </div>
              </div>
              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <Button
                  type='button'
                  buttonText='Save Client'
                  onClick={() => setOpen(false)}
                  customStyle='w-full mb-6 sm:ml-4 sm:mb-0 sm:w-auto'
                />
                <Button
                  type='button'
                  buttonText='Cancel'
                  onClick={() => setOpen(false)}
                  customStyle='w-full sm:w-auto !bg-none !border !text-slate-400 !font-normal hover:border-blue-400 !hover:bg-none hover:hue-rotate-0 !hover:shadow-md'
                  ref={cancelButtonRef}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
