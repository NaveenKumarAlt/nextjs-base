import { IconProps } from './icon.types';

const CloseIcon = ({ height, width, fill }: IconProps) => {
  return (
    <svg
      width={width || 22}
      height={height || 22}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      <path
        d="M15.6691 0.444336L9.06914 7.04434L2.46914 0.444336L0.445312 2.46816L7.04531 9.06816L0.445312 15.6682L2.46914 17.692L9.06914 11.092L15.6691 17.692L17.693 15.6682L11.093 9.06816L17.693 2.46816L15.6691 0.444336Z"
        fill={fill || '#231F20'}
      />
    </svg>
  );
};

export default CloseIcon;
