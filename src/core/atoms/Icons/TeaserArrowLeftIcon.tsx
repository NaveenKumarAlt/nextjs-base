import { IconProps } from './icon.types';

const TeaserArrowLeftIcon = ({ height, width, fill }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      <path
        d="M18.8086 16.8677L17.5531 15.5221L4.16164 0.937499L0.790546 3.62871L12.95 16.8674L0.790545 30.106L4.16163 32.7972L17.5531 18.2126L18.8086 16.8677Z"
        fill={fill || 'white'}
      />
    </svg>
  );
};

export default TeaserArrowLeftIcon;
