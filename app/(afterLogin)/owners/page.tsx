'use client';
import { Avatar, Button, Card, Popconfirm, Switch, Table } from 'antd';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { CheckOutlined } from '@ant-design/icons';
import { useGetOwnersUser } from '@/store/server/features/users/queries';
import { BiUser } from 'react-icons/bi';
import { useDeleteUser } from '@/store/server/features/users/mutation';

function Owners() {
  const { data, isLoading: isBookGetLoading } = useGetOwnersUser();
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (id: string) => {
    deleteUser(id);
  };
  /* eslint-disable @typescript-eslint/naming-convention */

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (_: any, _a: any, index: number) => (
        <p>{String(index + 1).padStart(2, '0')}</p>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'name',
      key: 'user',
      render: (_: any, record: any) => (
        <div className="flex justify-start items-center gap-2">
          <Avatar
            size={25}
            src={record?.profileImage || undefined}
            icon={!record?.profileImage && <BiUser />}
            alt="Profile Image"
          />
          <p>{record?.name ?? '-'}</p>
        </div>
      ),
    },
    {
      title: 'Upload',
      dataIndex: 'books',
      key: 'books',
      render: (item: string) => <p>{item?.length ?? '-'} Books </p>,
    },

    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => (
        <div className="flex justify-start items-center gap-2">
          <p>{location ?? '-'}</p>
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
              className={`w-1/2 space-x-2 p-2 rounded-full ${
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
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex justify-between items-center ">
          <div className="flex justify-start items-center gap-2">
            <Popconfirm
              title="Are you sure to delete this book?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <AiFillDelete style={{ cursor: 'pointer', color: '#ff4d4f' }} />
            </Popconfirm>
          </div>

          <Button type="primary" disabled={record.status} onClick={() => {}}>
            {record.status ? 'Approved' : 'Approve'}
          </Button>
        </div>
      ),
    },
  ];
  /* eslint-enable @typescript-eslint/naming-convention */

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
export default Owners;
