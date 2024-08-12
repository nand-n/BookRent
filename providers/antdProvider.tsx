import { ConfigProvider } from 'antd';
import { customizeRenderEmpty } from '@/components/emptyIndicator';

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      renderEmpty={customizeRenderEmpty}
      theme={{
        components: {
          Menu: {
            itemSelectedBg: '#F8F8F8',
            itemSelectedColor: '#111827',
            itemColor: '#111827',
            itemMarginInline: 8,
          },
          Form: {
            verticalLabelPadding: '0px',
            itemMarginBottom: 12,
          },
          Table: {
            headerBg: '#FAFAFA',
          },
          Empty: {},
        },
        token: {
          colorPrimary: '#00ABFF',
          colorSuccess: '#0CAF60',
          colorError: '#E03137',
          colorWarning: '#FACC15',
          borderRadius: 9,
          fontFamily: 'Manrope',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
