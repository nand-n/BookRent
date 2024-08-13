import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetMonthlySalesStatistics } from '@/store/server/features/sales/queries';

const { Text, Title } = Typography;

const ThisMonthStatistics: React.FC = () => {
  const date = dayjs().format('ddd, D MMM, YYYY, h:mm A');

  const { data: monthlySalesStatisticsData, isLoading: loading } =
    useGetMonthlySalesStatistics();

  return (
    <Card
      loading={loading}
      title={
        <div>
          <Title level={5} style={{ margin: 0 }}>
            This Month Statistics
          </Title>
          <Text type="secondary">{date}</Text>
        </div>
      }
      bordered={false}
    >
      <div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Income</Text>
            <Text type="secondary">This Month</Text>
          </div>
          <Title level={3} style={{ margin: 0 }}>
            ETB {monthlySalesStatisticsData?.totalIncome.toFixed(2)}{' '}
            <Text
              type={
                (monthlySalesStatisticsData?.percentageChange ?? 0) < 0
                  ? 'danger'
                  : 'success'
              }
            >
              {monthlySalesStatisticsData?.percentageChange && (
                <>
                  {monthlySalesStatisticsData?.percentageChange < 0 ? (
                    <ArrowDownOutlined />
                  ) : (
                    <ArrowUpOutlined />
                  )}{' '}
                  {Math.abs(monthlySalesStatisticsData.percentageChange)}%
                </>
              )}
            </Text>
          </Title>
          <Text type="secondary">
            Compared to ETB{' '}
            {monthlySalesStatisticsData?.previousMonthIncome.toFixed(2)} last
            month
          </Text>
        </div>
        <div
          className="flex justify-between gap-4 items-center"
          style={{ marginTop: '16px' }}
        >
          <Text>Last Month Income</Text>
          <Text className="font-bold text-xl" style={{ margin: 0 }}>
            ETB {monthlySalesStatisticsData?.previousMonthIncome.toFixed(2)}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ThisMonthStatistics;
