import { IconProps } from './icon.types';

const PlayIcon = ({ height, width }: IconProps) => {
  return (
    <svg
      width={width || '35'}
      height={height || '35'}
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      <rect width="109" height="109" rx="54.5" fill="#74519A" />
      <path d="M79 54L43 74.7846L43 33.2154L79 54Z" fill="white" />
    </svg>
  );
};

export default PlayIcon;
