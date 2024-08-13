'use client';
import { useBookGetsByAdmin } from '@/store/server/features/books/queries';
import { Card, Switch, Table } from 'antd';
import Image from 'next/image';
import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

function Books() {
  const { data, isLoading: isBookGetLoading } = useBookGetsByAdmin();
  /* eslint-disable  @typescript-eslint/naming-convention */

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (_: any, _a: any, index: number) => (
        <p>{String(index + 1).padStart(2, '0')}</p>
      ),
    },
    { title: 'Author', dataIndex: 'bookAuthor', key: 'BookAuthor' },
    {
      title: 'Owner',
      dataIndex: 'user',
      key: 'user',
      render: (_: any, record: any) => (
        <div className="flex justify-start items-center gap-2">
          <Image
            width={50}
            height={50}
            alt="image"
            src={record?.user?.profileImage}
          />
          <p>{record?.user.name}</p>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => (
        <div className="flex justify-start items-center gap-2">
          <p>{category?.name}</p>
        </div>
      ),
    },
    {
      title: 'Book Name',
      dataIndex: 'name',
      key: 'name',
      render: (bookName: any) => (
        <div className="flex justify-start items-center gap-2">
          <p>{bookName}</p>
        </div>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => {
        const isActive = status == true;

        return (
          <div className="flex justify-start items-center gap-2">
            <div
              className={`flex items-center space-x-2 p-2 rounded-full ${
                isActive ? 'bg-green-100' : 'bg-gray-200'
              }`}
            >
              <CheckOutlined
                className={isActive ? 'text-green-700' : 'text-gray-400'}
              />
              <span className={isActive ? 'text-green-700' : 'text-gray-400'}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
              <Switch
                checked={isActive}
                className={`w-20 ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                checkedChildren={null}
                unCheckedChildren={null}
                disabled={!isActive}
              />
            </div>
          </div>
        );
      },
    },
  ];
  /* eslint-enable  @typescript-eslint/naming-convention */

  return (
    <Card bordered={false} title="Live Book Status">
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 20 }}
        loading={isBookGetLoading}
      />
    </Card>
  );
}
export default Books;
