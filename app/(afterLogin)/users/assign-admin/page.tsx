'use client';

import React, { useEffect } from 'react';
import { Table, Tabs, Button, Popconfirm } from 'antd';
import useUserUIState from '@/store/uistate/features/users/useStore';
import { useGetUsers } from '@/store/server/features/users/queries';
import { useAssignRole } from '@/store/server/features/users/mutation';
import { User } from '@/types/features/users';
import NotificationMessage from '@/components/common/notification/notificationMessage';

const AssignAdminPage: React.FC = () => {
  const { activeRole, setActiveRole, isLoading, setLoading } = useUserUIState();
  const { data: users, refetch } = useGetUsers();
  const { mutateAsync: assignRole } = useAssignRole();

  const handleAssignRole = async (userId: string, newRole: string) => {
    try {
      await assignRole({ id: userId, role: newRole });
      NotificationMessage.success({
        message: 'Successully Assigned user',
        description: `User role updated to ${newRole}`,
      });
      refetch();
    } catch (error: unknown) {
      NotificationMessage.error({
        message: 'Failed to update user role',
        description: `Filed to update the user ${error}`,
      });
    }
  };

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
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <Popconfirm
          title="Are you sure you want to assign this user as an admin?"
          onConfirm={() => handleAssignRole(record.id, 'admin')}
          okText="Yes"
          cancelText="No"
          disabled={record.role === 'admin' || record.role === 'super-admin'}
        >
          <Button
            type="primary"
            disabled={record.role === 'admin' || record.role === 'super-admin'}
          >
            Assign as Admin
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'owner',
      label: 'Book Owners',
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
  /* eslint-enable  @typescript-eslint/naming-convention */

  useEffect(() => {
    setLoading(true);
    refetch().finally(() => setLoading(false));
  }, [activeRole, setLoading, refetch]);

  return (
    <div className="max-w-full overflow-x-auto">
      <Tabs
        defaultActiveKey={'owner'}
        activeKey={activeRole}
        onChange={(key) => setActiveRole(key)}
      >
        {tabItems.map((tab) => (
          <Tabs.TabPane active tab={tab.label} key={tab.key}>
            <Table
              columns={columns}
              dataSource={
                users?.items?.filter((item: User) => item.role == tab.key) ?? []
              }
              loading={isLoading}
              rowKey="id"
              scroll={{ x: 'max-content' }}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default AssignAdminPage;
