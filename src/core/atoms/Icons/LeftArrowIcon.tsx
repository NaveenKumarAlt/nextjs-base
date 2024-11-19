import { IconProps } from './icon.types';

const LeftArrowIcon = ({ height, width, fill }: IconProps) => {
  return (
    <svg
      width={width || 10}
      height={height || 19}
      viewBox="0 0 10 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Arrow icon</title>
      <path
        d="M4.1738e-08 3.49992L0.27871 3.79557L3.25162 7L4 6.40871L1.3006 3.5L4 0.591294L3.25162 1.11631e-07L0.27871 3.20443L4.1738e-08 3.49992Z"
        fill={fill || 'white'}
      />
    </svg>
  );
};

export default LeftArrowIcon;
