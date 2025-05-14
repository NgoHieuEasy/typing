import { memo } from "react";

interface Props {
  currentColor?: string;
}

function MoreIcon({ currentColor = "#202654" }: Props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="5" r="1.5" fill={currentColor} />
      <circle cx="12" cy="12" r="1.5" fill={currentColor} />
      <circle cx="12" cy="19" r="1.5" fill={currentColor} />
    </svg>
  );
}

export default memo(MoreIcon);
