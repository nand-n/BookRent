import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Fiction', value: 54, color: '#1890ff' },
  { name: 'Self Help', value: 20, color: '#52c41a' },
  { name: 'Business', value: 26, color: '#f5222d' },
];

const AvailableBooksChart = () => {
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="legend-container">
          {data.map((entry, index) => (
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
