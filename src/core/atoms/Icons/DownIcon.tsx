type downIconProps = { fill?: string; width?: string; height?: string };

const DownIcon = ({ fill, height, width }: downIconProps) => {
  return (
    <svg
      width={width || '12'}
      className="group-hover:fill-white transition ease-in-out delay-100"
      height={height || '6'}
      viewBox="0 0 6 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill || '#39224E'}
        d="M2.18257 3.5L2.35151 3.29097L4.18262 1.06129L3.84474 0.5L2.18262 2.52455L0.520499 0.5L0.182617 1.06129L2.01372 3.29097L2.18257 3.5Z"
      />
    </svg>
  );
};

export default DownIcon;
