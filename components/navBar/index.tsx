'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppstoreOutlined,
  BarChartOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { FaStarOfLife } from 'react-icons/fa';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';

import { Layout, Menu, Button, Skeleton, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import type { MenuProps } from 'antd';
import { CiSettings } from 'react-icons/ci';
import { LuUsers } from 'react-icons/lu';
import useAuthStore from '@/store/uistate/auth/login/useAuth';
import CustomBreadcrumb from '../common/breadCramp';

import { generateDynamicTitleAndSubtitle } from '@/utils/getTitleAndSubtitle';

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

  const { user } = useAuthStore();

  const getMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [
      {
        key: '/dashboard',
        icon: <CiSettings />,
        label: 'Dashboard',
      },
    ];

    if (user?.role === 'super-admin') {
      items.push(
        {
          key: '/dashboard/finance',
          icon: <BarChartOutlined />,
          label: 'Finance',
        },
        {
          key: '/dashboard/manage-users',
          icon: <LuUsers />,
          label: 'Manage Users',
          children: [
            {
              key: '/dashboard/users/user-list',
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
      items.push(
        {
          key: '/book-upload',
          icon: <CiSettings />,
          label: 'Book Upload',
        },
        {
          key: '/login-as-admin',
          icon: <BarChartOutlined />,
          label: 'Login As Admin',
        },
      );
    } else if (user?.role == 'admin') {
      items.push(
        {
          key: '/books',
          icon: <BarChartOutlined />,
          label: 'Books',
        },
        {
          key: '/owners',
          icon: <BarChartOutlined />,
          label: 'Owners',
        },
        {
          key: '/login-as-admin',
          icon: <BarChartOutlined />,
          label: 'Login As Admin',
        },
      );
    }

    items.push(
      {
        key: '/notification',
        icon: <BarChartOutlined />,
        label: 'Notification',
      },
      {
        key: '/settings',
        icon: <BarChartOutlined />,
        label: 'Setings',
      },
    );

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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileCollapsed = () => {
    setMobileCollapsed(!mobileCollapsed);
  };

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
    if (isMobile) {
      setMobileCollapsed(true);
    }
  };

  const pathname = usePathname();

  const { title, subtitle } = generateDynamicTitleAndSubtitle(pathname);

  // Get the breadcrumb data based on the current route and user role
  // const breadcrumb = breadcrumbConfig[pathname]?.[user.role] || { title: 'Home', subtitle: '' };

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
            <FaStarOfLife color="#3636F0" />
            {!collapsed && (
              <p className="text-xl text-white font-bold uppercase">
                {' '}
                Book Rent
              </p>
            )}
          </div>
          <div onClick={toggleCollapsed} className="text-black text-xl">
            {collapsed ? (
              <MdOutlineKeyboardDoubleArrowRight />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft />
            )}
          </div>
        </div>
        {!collapsed && (
          <div className="mt-12 flex justify-between items-center border-2 border-[#7003ffc5] px-4 py-3 mx-4 rounded-lg">
            <AppstoreOutlined size={24} className="text-black" />
          </div>
        )}

        {loading ? (
          <Skeleton className="mt-5 px-4" active />
        ) : (
          <div className="grid mt-3">
            <Menu
              mode="inline"
              defaultSelectedKeys={['/dashboard']}
              items={getMenuItems()}
              inlineCollapsed={collapsed}
              className={`my-2 h-full`}
              theme={'dark'}
              onClick={handleMenuClick}
            />
            <div className="text-white">gdsf</div>
          </div>
        )}
      </Sider>
      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 10 : 20,
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* <Header
          style={{
            padding: 4,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
            top: 0,
            left: isMobile && mobileCollapsed ? 0 : collapsed ? 80 : 280,
            transition: 'left 0.3s ease',
          }}
        >
          {isMobile && (
            <div className="w-full h-full p-[10px] grid justify-center items-center">
              <Button
                className="w-full h-full"
                onClick={toggleMobileCollapsed}
                icon={
                  !mobileCollapsed ? (
                    <IoCloseOutline
                      size={24}
                      className="text-gray-500 border-none"
                    />
                  ) : (
                    <MenuOutlined
                      size={24}
                      className="text-gray-500 border-none"
                    />
                  )
                }
              />
            </div>
          )}
        </Header> */}
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
