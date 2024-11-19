import { IconProps } from './icon.types';

const HamburgerIcon = ({ fill }: IconProps) => {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Menu icon</title>
      <path
        d="M0.884277 0.388672V4.70867H31.1243V0.388672H0.884277ZM0.884277 9.74867V14.0687H31.1243V9.74867H0.884277ZM0.884277 19.1087V23.4287H31.1243V19.1087H0.884277Z"
        fill={fill || '#39224E'}
      />
    </svg>
  );
};

export default HamburgerIcon;
