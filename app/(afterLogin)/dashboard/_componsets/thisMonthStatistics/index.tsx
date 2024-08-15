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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Title level={5} style={{ margin: 0 }}>
            This Month Statistics
          </Title>
          <Text type="secondary">{date}</Text>
        </div>
      }
      bordered={false}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
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
                  {Math.abs(
                    monthlySalesStatisticsData.percentageChange,
                  ).toFixed(2)}
                  %
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
        <div className="flex justify-between items-center">
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
