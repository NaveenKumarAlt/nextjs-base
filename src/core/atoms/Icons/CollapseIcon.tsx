const AccordianCollapse = () => {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      className="minus"
      style={{ cursor: 'pointer', touchAction: 'manipulation', pointerEvents: 'auto' }}
      height="47"
      viewBox="0 0 47 47"
      fill="none"
    >
      <circle cx="23.5" cy="23.5" r="23.5" />
      <path d="M17 24.767V22.5H31.154V24.767H19Z" fill="#EFF0ED" />
    </svg>
  );
};

export default AccordianCollapse;
