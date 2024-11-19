import { IconProps } from './icon.types';

const TeaserArrowRightIcon = ({ height, width, fill }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.191406 16.8686L1.44686 18.2142L14.8384 32.7988L18.2095 30.1076L6.04997 16.869L18.2095 3.63029L14.8384 0.939079L1.44686 15.5237L0.191406 16.8686Z"
        fill={fill || 'white'}
      />
    </svg>
  );
};

export default TeaserArrowRightIcon;
