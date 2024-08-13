'use client';
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import Error from 'next/error';
import CustomButton from '@/components/common/buttons/customButton';
import { useGetCategory } from '@/store/server/features/category/queries';

const { Option } = Select;

interface BookUploadFormProps {
  onClose: () => void;
  open: boolean;
  submitAction: (values: any) => void;
  bookUploadData?: any;
  title: string;
  loading: boolean;
}

const BookUploadForm = ({
  onClose,
  open,
  submitAction,
  bookUploadData,
  title,
  loading,
}: BookUploadFormProps) => {
  const [form] = Form.useForm();
  const [error, setEror] = useState(null);

  const { data: categoroyList } = useGetCategory();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        submitAction(values);
        onClose();
        form.resetFields();
      })
      .catch((error) => {
        setEror(error);
      });
  };

  useEffect(() => {
    if (bookUploadData) {
      form.setFieldsValue({
        ...bookUploadData,
      });
    }
  }, [bookUploadData, form]);

  error && <Error title={error} statusCode={400} withDarkMode />;
  return (
    <div>
      <Modal
        loading={loading}
        onCancel={onClose}
        open={open}
        style={{ paddingBottom: 80 }}
        footer={
          <div className="w-full text-center">
            <CustomButton
              title={!bookUploadData ? 'Add' : 'Update'}
              type="primary"
              onClick={handleSubmit}
              className="w-full h-12 bg-primary hover:bg-blue-700 mr-4 flex text-center justify-center items-center"
            />
          </div>
        }
      >
        <div className="font-bold text-3xl text-center py-4 ">{title}</div>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Book Name"
            rules={[{ required: true, message: 'Please enter book name' }]}
          >
            <Input size="large" placeholder="Book name" />
          </Form.Item>

          <Form.Item
            name="authorName"
            label="Author Name"
            rules={[{ required: true, message: 'Please enter author name' }]}
          >
            <Input size="large" placeholder="Author Name" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            className="w-full"
            rules={[{ required: true, message: 'Please select author name' }]}
          >
            <Select
              className=" h-12"
              placeholder={'search book by name or Author'}
            >
              {categoroyList?.map(({ id, name }, index) => {
                return (
                  <Option name={id} key={index} value={id}>
                    {name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookUploadForm;
