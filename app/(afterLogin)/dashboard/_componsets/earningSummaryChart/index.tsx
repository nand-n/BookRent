import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DatePicker, Checkbox, Card } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useGetEarningSummary } from '@/store/server/features/sales/queries';

const { RangePicker } = DatePicker;

const EarningSummaryChart = () => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs('2024-03'),
    dayjs('2024-10'),
  ]);
  const [showLast6Months, setShowLast6Months] = useState(true);
  const [showSamePeriodLastYear, setShowSamePeriodLastYear] = useState(true);

  const { data: earningSummary } = useGetEarningSummary();

  const transformedData = useMemo(() => {
    if (!earningSummary) return [];

    return earningSummary.map(({ month }) => {
      const currentMonth = dayjs(month);
      const lastYearMonth = currentMonth.subtract(1, 'year').format('MMM YYYY');

      const last6MonthsData = earningSummary.find(({ month: m }) =>
        dayjs(m).isSame(currentMonth, 'month'),
      )?.total;

      const samePeriodLastYearData = earningSummary.find(({ month: m }) =>
        dayjs(m).isSame(lastYearMonth, 'month'),
      )?.total;

      return {
        date: currentMonth.format('MMM YYYY'),
        last6Months: last6MonthsData || 0,
        samePeriodLastYear: samePeriodLastYearData || 0,
      };
    });
  }, [earningSummary]);

  return (
    <Card
      bordered={false}
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
          className="text-sm"
        >
          <h6>Earning Summary</h6>

          <RangePicker
            value={dateRange}
            onChange={(dates) =>
              setDateRange(dates as [Dayjs | null, Dayjs | null])
            }
            picker="month"
            format="MMM YYYY"
          />

          <div>
            <Checkbox
              checked={showLast6Months}
              onChange={(e) => setShowLast6Months(e.target.checked)}
            >
              Last 6 months
            </Checkbox>
            <Checkbox
              checked={showSamePeriodLastYear}
              onChange={(e) => setShowSamePeriodLastYear(e.target.checked)}
            >
              Same period last year
            </Checkbox>
          </div>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={transformedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorLast6Months" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id="colorSamePeriodLastYear"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {showLast6Months && (
            <Area
              type="monotone"
              dataKey="last6Months"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorLast6Months)"
            />
          )}
          {showSamePeriodLastYear && (
            <Area
              type="monotone"
              dataKey="samePeriodLastYear"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorSamePeriodLastYear)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EarningSummaryChart;
