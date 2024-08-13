'use client';
import { useBookGetsByAdmin } from '@/store/server/features/books/queries';
import React, { ChangeEvent, useEffect, useState } from 'react';
import BookUploadForm from './_components/bookForm';
import { Form, Input, Select, Button, Upload } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { UploadFile } from 'antd/lib';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useBookPublish } from '@/store/uistate/features/bookPublish/useStore';
import {
  useAddBook,
  usePublishBook,
} from '@/store/server/features/publishBook/mutation';
import CustomSuccessModal from '@/components/common/sucessModal/successModal';

function BookUpload() {
  const { data: booksCreatedByadmins } = useBookGetsByAdmin();
  const [visible, setVisible] = useState<boolean>(false);
  const [successVisible, setSuccessVisible] = useState<boolean>(false);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const { Option } = Select;
  const [form] = Form.useForm();

  const {
    coverImage,
    quantity,
    rentPrice,
    setCoverImage,
    setQuantity,
    setRentPrice,
    selectedBookId,
    setSelectedBook,
  } = useBookPublish();
  const {
    mutate: publishBook,
    isSuccess,
    isLoading: isSubmitLoading,
  } = usePublishBook();
  const { mutate: addBook, isLoading: isAddbookLoading } = useAddBook();

  const onSubmit = () => {
    form.validateFields();
    const data = {
      id: selectedBookId,
      body: {
        files: coverImage?.originFileObj,
        quantity,
        price: rentPrice,
      },
    };
    publishBook(data);
  };
  const onAddSubmit = (value: any) => {
    addBook(value);
  };
  useEffect(() => {
    if (isSuccess == true) {
      setSuccessVisible(true);
    }
  }, [isSuccess]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFileChange = (info: any) => {
    const fileList = info.fileList as UploadFile<any>[];
    if (fileList.length > 0) {
      setCoverImage(fileList[0]);
    } else {
      setCoverImage(undefined);
    }
  };

  const getImageUrl = (file: UploadFile<any> | undefined) => {
    if (file) {
      if (file.url) {
        return file.url;
      }
      if (file.originFileObj) {
        return URL.createObjectURL(file.originFileObj);
      }
    }
    return '';
  };

  return (
    <div className="py-8 flex flex-col items-center bg-white w-full min-h-screen">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Upload New Book</h2>
      </div>
      <div className="relative w-96 mb-6 rounded-t-2xl bg-gray-200">
        <div className=" text-gray-500 p-2 ">Search book by name or author</div>

        <Select
          showSearch
          value={selectedBookId}
          onChange={(value) => setSelectedBook(value)}
          placeholder="Search..."
          className={clsx(
            'w-full border-2 text-black',
            dropdownOpen ? ' border-b-blue' : 'border-b-black',
          )}
          onDropdownVisibleChange={(open) => setDropdownOpen(open)}
          filterOption={(input, option: any) =>
            option?.children.toLowerCase().includes(input.toLowerCase())
          }
          dropdownRender={(menu) => (
            <>
              {menu}
              <div
                className="border-t px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => setVisible(true)}
              >
                Add
              </div>
            </>
          )}
        >
          {booksCreatedByadmins?.map((book, index) => (
            <Option key={index} value={book.id}>
              {book.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="w-96 mb-6">
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <div className="flex justify-between gap-4">
            <Form.Item
              name="quantity"
              label="Book Quantity"
              className="w-full"
              rules={[{ required: true, message: 'Please select quantity' }]}
            >
              <Select
                onSelect={(e) => setQuantity(Number(e))}
                placeholder="Book Quantity"
                className="h-12"
              >
                {/* eslint-disable  @typescript-eslint/naming-convention */}
                {Array.from({ length: 1000 }, (_, index) => (
                  <Option key={index} value={index + 1}>
                    {index + 1}
                  </Option>
                ))}
                {/* eslint-enable @typescript-eslint/naming-convention */}
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label="Rent price for 2 weeks"
              className="w-full"
              rules={[{ required: true, message: 'Please enter book price' }]}
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRentPrice(Number(e.target.value))
                }
                type="number"
                size="large"
                placeholder="Rent price for 2 weeks"
                className="w-full h-12"
              />
            </Form.Item>
          </div>
          <Form.Item
            id="coverImage"
            name="coverImage"
            label="Book Cover Image"
            rules={[
              { required: true, message: 'Please uplaod book cover image!' },
            ]}
            className={'w-full font-bold text-4xl mt-4'}
          >
            <Form.Item
              label="Upload Book Cover"
              className="w-full font-normal text-xl mt-4"
            >
              <Form.Item
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                className="mt-2 w-full font-normal text-xl"
              >
                <Upload.Dragger
                  name="files"
                  className="mt-2"
                  onChange={handleFileChange}
                  fileList={coverImage ? [coverImage] : []}
                  showUploadList={false}
                  accept="image/*"
                  maxCount={1}
                >
                  {coverImage ? (
                    <div className="mt-4">
                      <Image
                        width={300}
                        height={300}
                        src={getImageUrl(coverImage)}
                        alt="Uploaded Preview"
                        className="w-full h-auto max-h-64 object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-5xl flex justify-center text-primary ">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="ant-upload-text">Upload book cover</p>
                      <p className="ant-upload-hint">
                        or drag and drop it here
                      </p>
                      <p className="ant-upload-hint">Square 300 x 300 px</p>
                    </>
                  )}
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Form.Item>
          <Button
            loading={isSubmitLoading}
            type="primary"
            className="w-full h-12"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </div>

      <BookUploadForm
        onClose={() => setVisible(false)}
        open={visible}
        submitAction={onAddSubmit}
        title="Add Book"
        loading={isAddbookLoading}
      />
      <CustomSuccessModal
        onClose={() => setSuccessVisible(false)}
        visible={successVisible}
        text="Your have uploaded the book successfully. Waite until we approved it."
      />
    </div>
  );
}

export default BookUpload;
