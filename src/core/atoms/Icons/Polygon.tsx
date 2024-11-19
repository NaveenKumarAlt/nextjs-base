import { IconProps } from './icon.types';

const Polygon = ({ height, width }: IconProps) => {
  return (
    <svg
      className="fill-white scale-150"
      width={width || '10'}
      height={height || '5'}
      viewBox="0 0 30 10"
      fill="none"
      preserveAspectRatio="none"
    >
      <polygon points="0,0 30,0 15,10"></polygon>
    </svg>
  );
};

export default Polygon;
