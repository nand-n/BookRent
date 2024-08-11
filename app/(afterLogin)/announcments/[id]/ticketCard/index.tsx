'use client';
import React, { useState } from 'react';
import { Card, Popover, Input, Button, Form } from 'antd';
import { Ticket } from '@/store/server/features/announcment/interface';
import { useAssignTicket } from '@/store/server/features/tickets/mutation';
import NotificationMessage from '@/components/common/notification/notificationMessage';

interface TicketCardProps {
  ticket: Ticket;
  handleNumberClick: (ticketNumber: number, phoneNumber: string) => void;
  announcementId: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  handleNumberClick,
  announcementId,
}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [form] = Form.useForm();

  const { mutate: assignTicket, isLoading } = useAssignTicket(announcementId);

  const handleCardClick = () => {
    if (!ticket?.payerPhone) {
      setIsPopoverVisible(true);
    }
  };

  const handlePhoneNumberSubmit = (values: { phoneNumber: string }) => {
    const { phoneNumber } = values;
    assignTicket(
      { id: ticket.id, dataP: { phoneNumber: `251${phoneNumber}` } },
      {
        onSuccess: () => {
          NotificationMessage.success({
            message: 'Phone number assigned successfully',
            description: 'Succeess',
          });
          handleNumberClick(ticket.number, phoneNumber);
          setIsPopoverVisible(false);
          form.resetFields();
        },
        onError: () => {
          NotificationMessage.error({
            message: 'Failed to assign phone number',
            description: 'error',
          });
        },
      },
    );
  };

  const popoverContent = (
    <Form
      form={form}
      onFinish={handlePhoneNumberSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
    >
      <Form.Item
        name="phoneNumber"
        rules={[
          { required: true, message: 'Please enter phone number' },
          {
            pattern: /^\d{9}$/,
            message: 'Phone number must be 9 digits',
          },
        ]}
      >
        <Input
          type="number"
          addonBefore="+251"
          maxLength={9}
          placeholder="Enter phone number"
          disabled={isLoading}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return ticket?.payerPhone ? (
    <Card
      key={ticket.id}
      aria-disabled={true}
      className="cursor-not-allowed border bg-purple text-white"
    >
      <p className="p-2 text-sm flex justify-center items-center text-center lg:p-8 lg:text-4xl font-bold">
        {ticket.number}
      </p>
    </Card>
  ) : (
    <Popover
      content={popoverContent}
      title="Enter Phone Number"
      trigger="click"
      open={isPopoverVisible}
      onOpenChange={(visible) => setIsPopoverVisible(visible)}
    >
      <Card
        key={ticket.id}
        className="cursor-pointer border bg-gray-800 dark:text-white border-gray-700"
        onClick={handleCardClick}
      >
        <p className="p-2 text-sm flex justify-center items-center text-center lg:p-8 lg:text-4xl font-bold">
          {ticket.number}
        </p>
      </Card>
    </Popover>
  );
};

export default TicketCard;
