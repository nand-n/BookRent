'use client';
import { Button, Modal, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const { Text } = Typography;

interface CustomSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  text: string;
}

const CustomSuccessModal: React.FC<CustomSuccessModalProps> = ({
  visible,
  onClose,
  text,
}) => {
  return (
    <Modal open={visible} footer={null} onCancel={onClose} centered>
      <div style={{ textAlign: 'center' }} className="grid ">
        <div className="flex justify-center  items-center">
          <Image
            className=""
            src="/icons/smile.svg"
            alt="Success"
            width={200}
            height={200}
          />
        </div>

        <Text className="mt-4 font-bold text-2xl">Congrats</Text>

        <Text className="mt-4 font-bold text-sm text-gray-400 mb-4">
          {text}
        </Text>
        <div className=" w-full flex justify-center items-center">
          <Button
            className="max-w-20 px-12 h-12"
            type="primary"
            onClick={() => onClose()}
          >
            {' '}
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomSuccessModal;
