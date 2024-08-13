import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useAvailabeBooks } from '@/store/server/features/books/queries';
import { transformCategoryData } from '@/utils/transformBookCategoryData';

const AvailableBooksChart = () => {
  const { data: bookDataTobeTransformed } = useAvailabeBooks();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(transformCategoryData(bookDataTobeTransformed));
  }, [bookDataTobeTransformed]);
  return (
    <Card bordered={false} title="Available Books" extra={<span>Today</span>}>
      <div className="grid justify-center items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="60%"
            cy="60%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data?.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="legend-container">
          {data?.map((entry: any, index: any) => (
            <div
              key={`legend-${index}`}
              className="legend-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: entry.color,
                  borderRadius: '50%',
                  marginRight: '8px',
                }}
              ></div>
              <span style={{ marginRight: '8px' }}>{entry.name}</span>
              <span>{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AvailableBooksChart;
