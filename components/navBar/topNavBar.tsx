'use client';
import React from 'react';
import { Badge, Avatar, Menu, Dropdown, Layout, Button } from 'antd';
import { MailOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import useAuthStore from '@/store/uistate/auth/login/useAuth';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

interface NavBarProps {
  page: string;
  userid: string;
}

const NavBar = ({ page }: NavBarProps) => {
  const { logout } = useAuthStore((state) => state);
  const { user } = useAuthStore();
  const router = useRouter();
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href={`${URL}/profile`}>
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href={`/settings`}>
          Settings
        </a>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={() => {
            logout();
            router.replace('/authentication/login');
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="flex justify-between items-center bg-white shadow-md lg:w-full lg:pr-80"
      style={{
        padding: '0 20px',
      }}
    >
      <p>{page}</p>
      <div className="flex items-center ">
        <Badge count={5} className="mx-4">
          <MailOutlined style={{ fontSize: '20px' }} />
        </Badge>
        <Badge count={10} className="mx-4">
          <BellOutlined style={{ fontSize: '20px' }} />
        </Badge>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar
            icon={<UserOutlined />}
            alt={`${user?.name}`}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default NavBar;
