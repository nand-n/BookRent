'use client';
import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography } from 'antd';
import dayjs from 'dayjs';

function Dashboard() {
  // Sample data (replace with actual data)
  const statisticsData = {
    totalIncome: 12345,
    booksRented: 500,
    previousMonthIncome: 10000,
  };

  const liveBookStatusData = [
    {
      bookNumber: 'B001',
      name: 'The Lord of the Rings',
      status: 'Rented',
      price: 19.99,
    },
    {
      bookNumber: 'B002',
      name: "Harry Potter and the Sorcerer's Stone",
      status: 'Available',
      price: 14.99,
    },
    // ... more books
  ];
  const availableBooksData = [
    {
      bookNumber: 'B003',
      name: 'To Kill a Mockingbird',
      price: 12.99,
    },
    {
      bookNumber: 'B004',
      name: 'Pride and Prejudice',
      price: 9.99,
    },
    // ... more books
  ];

  const earningSummaryData = [
    {
      month: 'January',
      income: 8000,
    },
    {
      month: 'February',
      income: 9500,
    },
    // ... more months
  ];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Owner/Dashboard</h1>
      <p className="text-center mb-4">
        {dayjs('2019-01-25').format('DD/MM/YYYY')}
      </p>

      {/* This Month Statistics */}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Income">
            <Statistic title="$" value={statisticsData.totalIncome} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Books Rented">
            <Statistic title="Count" value={statisticsData.booksRented} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Previous Month Income">
            <Statistic title="$" value={statisticsData.previousMonthIncome} />
          </Card>
        </Col>
      </Row>

      {/* Live Book Status */}
      <Card title="Live Book Status" className="mt-4">
        {/* <Table dataSource={liveBookStatusData} columns={liveBookStatusData} /> */}
      </Card>

      {/* Available Books */}
      <Card title="Available Books" className="mt-4">
        {/* ... your available books content */}
      </Card>

      {/* Earning Summary */}
      <Card title="Earning Summary" className="mt-4">
        {/* ... your earning summary content */}
      </Card>
    </div>
  );
}

export default Dashboard;
