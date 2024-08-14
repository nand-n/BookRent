import { Card, Popconfirm, Radio, Table } from 'antd';
import React from 'react';
import './custom-radio-css.css';
import { useLiveBookStatus } from '@/store/server/features/books/queries';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useDeleteBook } from '@/store/server/features/books/mutation';

function LiveBookStatus() {
  const { data, isLoading: isBookGetLoading } = useLiveBookStatus();
  const router = useRouter();

  const { mutate: deleteBook } = useDeleteBook();

  const handleDelete = (bookId: string) => {
    deleteBook(bookId);
  };

  const liveBookData =
    data?.map((book, index) => ({
      key: book.id,
      no: String(index + 1).padStart(2, '0'),
      bookNo: book.bookNumber,
      bookName: book.name,
      status: book.bookAvailablitystatus,
      price: `${book.price} Birr`,
    })) || [];

  /* eslint-disable  @typescript-eslint/naming-convention */
  const columns = [
    { title: 'No.', dataIndex: 'no', key: 'no' },
    { title: 'Book no.', dataIndex: 'bookNo', key: 'bookNo' },
    { title: 'Book Name', dataIndex: 'bookName', key: 'bookName' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span>
          <Radio
            checked
            style={{
              color: status === 'Rented' ? '#cf1322' : '#52c41a',
            }}
            className={`custom-radio ${status === 'Rented' ? 'rented' : 'free'}`}
          >
            {status}
          </Radio>
        </span>
      ),
    },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex justify-start items-center gap-2">
          <AiFillEdit
            className="mr-2"
            onClick={() => router.push('/book-upload')}
            style={{ cursor: 'pointer', color: 'black' }}
          />
          <Popconfirm
            title="Are you sure to delete this book?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <AiFillDelete style={{ cursor: 'pointer', color: '#ff4d4f' }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  /* eslint-enable  @typescript-eslint/naming-convention */

  return (
    <div className="w-full">
      <Card
        bordered={false}
        title="Live Book Status"
        className="overflow-x-scroll"
      >
        <Table
          columns={columns}
          scroll={{ x: 'max-content' }}
          dataSource={liveBookData}
          pagination={{ pageSize: 5 }}
          loading={isBookGetLoading}
        />
      </Card>
    </div>
  );
}

export default LiveBookStatus;
