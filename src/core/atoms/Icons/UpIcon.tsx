type UpIconProps = { fill?: string; width?: string; height?: string };

const UpIcon = ({ fill, height, width }: UpIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '12'}
      height={height || '6'}
      viewBox="0 0 28 10"
      role="presentation"
    >
      <path
        fill={fill || '#231F20'}
        d="M8.2011 0.140633L7.54235 0.748133L0.402344 7.22813L1.71984 8.85936L8.20093 2.97553L14.682 8.85936L15.9995 7.22813L8.85951 0.748133L8.2011 0.140633Z"
      />
    </svg>
  );
};

export default UpIcon;
