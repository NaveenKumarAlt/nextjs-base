import { IconProps } from './icon.types';

const RightArrowIcon = ({ height, width }: IconProps) => {
  return (
    <svg
      width={width || 10}
      height={height || 19}
      viewBox="0 0 10 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      <path
        d="M9.79297 9.175L9.12497 8.4L1.99963 -3.44227e-07L0.205951 1.55L6.67575 9.1748L0.20595 16.7996L1.99963 18.3496L9.12497 9.9496L9.79297 9.175Z"
        fill="#EFF0ED"
      />
    </svg>
  );
};

export default RightArrowIcon;
