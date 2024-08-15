'use client';
import { useGetUsers } from '@/store/server/features/users/queries';
import useUserUIState from '@/store/uistate/features/users/useStore';
import { User } from '@/types/features/users';
import { Button, Popconfirm, Table, Tabs } from 'antd';
import React from 'react';

function UserListPage() {
  const { data: users, isLoading: loading } = useGetUsers();
  const { activeRole, setActiveRole, isLoading } = useUserUIState();
  /* eslint-disable  @typescript-eslint/naming-convention */
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Telegram User',
      dataIndex: 'telegramUser',
      key: 'telegramUser',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <Popconfirm
          title={`Are you sure you want to suspend ${record.name}?`}
          onConfirm={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Suspend User</Button>
        </Popconfirm>
      ),
    },
  ];
  /* eslint-enable  @typescript-eslint/naming-convention */

  const tabItems = [
    {
      key: 'owner',
      label: 'Owners',
    },
    {
      key: 'admin',
      label: 'Admins',
    },
    {
      key: 'super-admin',
      label: 'Super Admins',
    },
  ];

  return (
    <div className="w-full">
      <Tabs activeKey={activeRole} onChange={(key) => setActiveRole(key)}>
        {tabItems.map((tab) => (
          <Tabs.TabPane tab={tab.label} key={tab.key}>
            <Table
              columns={columns}
              dataSource={
                users?.items?.filter((item: User) => item.role == tab.key) ?? []
              }
              loading={isLoading || loading}
              rowKey="id"
              scroll={{
                x: 'max-content',
              }}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default UserListPage;
