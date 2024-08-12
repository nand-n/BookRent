import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

const ThisMonthStatistics = () => {
  const income = 9460.0;
  const lastMonthIncome = 25658.0;
  const percentageChange = -2.5;
  const previousIncome = 9940.0;

  const date = dayjs().format('ddd, D MMM, YYYY, h:mm A');

  return (
    <Card
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
      <div className="">
        <div className="" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Income</Text>
            <Text type="secondary">This Month</Text>
          </div>
          <Title level={3} style={{ margin: 0 }}>
            ETB {income.toFixed(2)}{' '}
            <Text type={percentageChange < 0 ? 'danger' : 'success'}>
              {percentageChange < 0 ? (
                <ArrowDownOutlined />
              ) : (
                <ArrowUpOutlined />
              )}{' '}
              {Math.abs(percentageChange)}%
            </Text>
          </Title>
          <Text type="secondary">
            Compared to ETB {previousIncome.toFixed(2)} last month
          </Text>
        </div>
        <div
          className=" flex justify-between gap-4 items-center"
          style={{ marginTop: '16px' }}
        >
          <Text>Last Month Income</Text>
          <Text className="font-bold text-xl" style={{ margin: 0 }}>
            ETB {lastMonthIncome.toFixed(2)}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ThisMonthStatistics;
