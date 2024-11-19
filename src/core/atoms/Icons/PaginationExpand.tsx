interface PaginationExpandProps {
  className?: string;
}
const PaginationExpand = ({ className }: PaginationExpandProps) => {
  return (
    <svg
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Arrow icon</title>
      <path
        d="M8.875 8.00017L8.2675 7.34142L1.7875 0.201416L0.156268 1.51892L6.04011 8L0.156267 14.4811L1.7875 15.7986L8.2675 8.65858L8.875 8.00017Z"
        fill="#39224E"
      />
    </svg>
  );
};

export default PaginationExpand;
