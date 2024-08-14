'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BarChartOutlined } from '@ant-design/icons';

import { Layout, Menu, Button, Skeleton, theme, Divider } from 'antd';
const { Content, Sider } = Layout;
import type { MenuProps } from 'antd';
import { CiSettings } from 'react-icons/ci';
import { LuUsers } from 'react-icons/lu';
import useAuthStore from '@/store/uistate/auth/login/useAuth';
import CustomBreadcrumb from '../common/breadCramp';

import { generateDynamicTitleAndSubtitle } from '@/utils/getTitleAndSubtitle';
import IconWrapper from '../common/iconWrapper';
import Image from 'next/image';

type MenuItem = Required<MenuProps>['items'][number];

interface MyComponentProps {
  children: ReactNode;
}

const Nav: React.FC<MyComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const toggleCollapsed = () => {
    setCollapsed(collapsed);
  };
  const { user, logout } = useAuthStore();

  const getMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [
      {
        key: '/dashboard',
        icon: <IconWrapper src="/icons/dashboard.svg" />,
        label: 'Dashboard',
      },
    ];

    if (user?.role === 'super-admin') {
      items.push(
        {
          key: '/dashboard',
          icon: <BarChartOutlined />,
          label: 'Finance',
        },
        {
          key: '/manage-users',
          icon: <LuUsers />,
          label: 'Manage Users',
          children: [
            {
              key: '/users/user-list',
              icon: <LuUsers />,
              label: 'Users List',
            },
            {
              key: '/dashboard/users/assign-admin',
              icon: <LuUsers />,
              label: 'Assign Admin',
            },
          ],
        },
      );
    }

    if (user?.role == 'owner') {
      items.push({
        key: '/book-upload',
        icon: <IconWrapper src="/icons/booksicons.svg" />,
        label: 'Book Upload',
      });
    } else if (user?.role == 'admin') {
      items.push(
        {
          key: '/books',
          icon: <IconWrapper src="/icons/books.svg" />,
          label: 'Books',
        },
        {
          key: '/owners',
          icon: <IconWrapper src="/icons/user.svg" />,
          label: 'Owners',
        },
      );
    }

    return items;
  };

  const getCommonMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [
      {
        key: '/notification',
        icon: <IconWrapper src="/icons/notification.svg" />,
        label: 'Notification',
      },
      {
        key: '/settings',
        icon: <IconWrapper src="/icons/settings.svg" />,
        label: 'Settings',
      },
    ];

    if (user?.role != 'owner') {
      items.push({
        key: '/authentication/login?Owner',
        icon: <IconWrapper src="/icons/user2.svg" />,
        label: 'Login as Book Owner',
      });
    } else if (user?.role == 'owner') {
      items.push({
        key: '/authentication/login?Admin',
        icon: <CiSettings />,
        label: 'Login as Admin',
      });
    } else {
      items.push({
        key: '/authentication/login?SuperAdmin',
        icon: <CiSettings />,
        label: 'Login as SuperAdmin',
      });
    }

    return items;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const timeoutId = setTimeout(() => setLoading(false), 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
    if (isMobile) {
      setMobileCollapsed(true);
    }
  };

  const pathname = usePathname();

  const { title, subtitle } = generateDynamicTitleAndSubtitle(pathname);

  return (
    <Layout hasSider>
      <Sider
        theme={'dark'}
        width={280}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          scrollbarWidth: 'thin',
          scrollbarColor: 'unset',
          transform: isMobile && mobileCollapsed ? 'translateX(-100%)' : 'none',
          transition: 'transform 0.3s ease',
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          if (broken) {
            setMobileCollapsed(true);
          }
        }}
        collapsedWidth={isMobile ? 80 : 80}
      >
        <div className="flex justify-between px-4 my-4">
          <div className=" flex items-center gap-2">
            <div
              onClick={toggleCollapsed}
              className="text-black text-xl cursor-pointer"
            >
              {collapsed ? (
                <IconWrapper
                  src="/icons/expandIcon.svg"
                  height={30}
                  width={30}
                />
              ) : (
                <IconWrapper
                  src="/icons/expandIcon.svg"
                  height={30}
                  width={30}
                />
              )}
            </div>
            {!collapsed && (
              <p className="text-xl text-white font-bold uppercase">
                {' '}
                <Image
                  src={'icons/bookRentIconBig.svg'}
                  alt="BookRent"
                  width={170}
                  height={60}
                />
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <Skeleton className="mt-5 px-4" active />
        ) : (
          <div className="grid h-full">
            <div className="flex flex-col justify-between h-full px-4 w-full relative">
              <div className="flex flex-col">
                <Divider style={{ background: '#F8F8F880' }} />

                <Menu
                  mode="inline"
                  defaultSelectedKeys={['/dashboard']}
                  items={getMenuItems()}
                  inlineCollapsed={collapsed}
                  className="my-0"
                  theme="dark"
                  onClick={handleMenuClick}
                />

                <Divider style={{ background: '#F8F8F880' }} />

                <Menu
                  mode="inline"
                  items={getCommonMenuItems()}
                  inlineCollapsed={collapsed}
                  className="my-0"
                  theme="dark"
                  onClick={handleMenuClick}
                />

                <Divider style={{ background: '#F8F8F880' }} />
              </div>

              <Button
                icon={<IconWrapper src="/icons/Logout.svg" />}
                className="mt-auto w-full bg-slate-700 text-white border-none h-12"
                onClick={() => logout()}
                type="default"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </Sider>
      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 10 : 20,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Content
          className="m-6"
          style={{
            paddingTop: isMobile ? 64 : 24,
            paddingLeft: isMobile ? 0 : collapsed ? 80 : 280,
            transition: 'padding-left 0.3s ease',
          }}
        >
          <div className="">
            {loading ? (
              <Skeleton className="h-full" active />
            ) : (
              <div className="grid grid-col">
                <div className="col-span1">
                  <div
                    className="rounded-2xl px-4 py-2"
                    style={{
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }}
                  >
                    {' '}
                    <CustomBreadcrumb
                      title={`${title}`}
                      subtitle={`${subtitle}}`}
                    />
                  </div>
                  <div
                    className="col-span-full p-6 bg-gray-100"
                    style={{
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                      marginTop: '2.5rem',
                      minHeight: '100vh',
                    }}
                  >
                    {children}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Nav;
