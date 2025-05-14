import { memo } from "react";
interface Props {
  currentColor?: string;
}
function LogoutIcon({ currentColor = "#202654" }: Props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9867 13.4016L18.3334 11.055L15.9867 8.70831"
        stroke={currentColor}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.94666 11.055H18.2692"
        stroke={currentColor}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.78 18.3334C6.72832 18.3334 3.44666 15.5834 3.44666 11C3.44666 6.41669 6.72832 3.66669 10.78 3.66669"
        stroke={currentColor}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default memo(LogoutIcon);
