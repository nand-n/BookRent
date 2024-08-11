'use client';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';
// import { Breadcrumb } from 'antd';

interface CustomBreadcrumbProps extends BreadcrumbProps {
  title: string;
  subtitle: string;
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
  title,
  subtitle,
  // className,
  // ...rest
}) => (
  <div className="grow shrink basis-0 flex-col justify-start items-center text-2xl inline-flex py-4">
    <div className="self-stretch flex justify-start items-center  text-gray-900 font-bold font-['Manrope'] leading-[31.20px]">
      {title}
      <div className="self-stretch text-slate-500  font-medium font-['Manrope'] leading-snug">
        {'/'}
        {subtitle}
      </div>
    </div>

    {/* <Breadcrumb className={`self-stretch ${className}`} {...rest} /> */}
  </div>
);

export default CustomBreadcrumb;
