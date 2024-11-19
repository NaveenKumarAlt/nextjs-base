type DownArrowProps = { fill?: string; width?: string; height?: string };

const DownArrow = ({ fill, height, width }: DownArrowProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '15.5'}
      height={height || '8.7'}
      viewBox="0 0 16 10"
      fill="none"
      className=""
      role="presentation"
    >
      <path
        d="M7.79842 9.35937L8.45717 8.75187L15.5972 2.27188L14.2797 0.640643L7.79859 6.52448L1.31751 0.640642L5.34532e-06 2.27187L7.14001 8.75187L7.79842 9.35937Z"
        fill={fill || '#CCCBBC'}
      />
    </svg>
  );
};

export default DownArrow;
