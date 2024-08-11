'use client';
import { useBookGetsByAdmin } from '@/store/server/features/books/queries';
import React, { useState } from 'react';
import BookUploadForm from './_components/bookForm';

function BookUplad() {
  const { data: booksCreatedByadmins } = useBookGetsByAdmin();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<string>('');

  return (
    <div className="py-4 grid justify-center items-center">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">Upload New Book</h2>
      </div>

      <div className="relative w-96 h-96  overflow-y-auto">
        <div
          className="border-1 border-b-black rounded-md flex justify-between items-center px-2 py-1 cursor-pointer bg-gray-300 "
          onClick={() => setDropDown(!dropDown)}
        >
          <div className="">
            <div className="">
              {' '}
              <div className="text-gray-400 font-light">
                Search book by name or author
              </div>
              <div className="p-0 border-b-black">
                <input
                  value={selectedBook}
                  type="text"
                  placeholder="Search..."
                  className="w-full  rounded-md p-2 outline-none bg-transparent"
                />
              </div>
              {dropDown && (
                <div className="absolute w-full bg-white shadow-lg border mt-1 rounded-md z-10 ">
                  <div className="max-h-48 overflow-y-auto py-2">
                    {booksCreatedByadmins?.map(({ name }, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedBook(name);
                          setDropDown(false);
                        }}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                  <div className="pb-4 pt-2 border-t-2">
                    <div
                      className=" px-4 py-2 cursor-pointer text-blue-500  text-primary hover:bg-gray-100"
                      onClick={() => setVisible(true)}
                    >
                      Add
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>{dropDown ? '▲' : '▼'}</div>
        </div>
      </div>

      <BookUploadForm
        onClose={() => setVisible(false)}
        open={visible}
        submitAction={(value) => {
          console.log(value);
        }}
        title="Add Book"
      />
    </div>
  );
}

export default BookUplad;
