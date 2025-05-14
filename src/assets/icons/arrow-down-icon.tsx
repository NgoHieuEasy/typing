import { memo } from "react";
interface Props {
  currentColor?: string;
}
function ArrowDownIcon({ currentColor = "#939393" }: Props) {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1L6 6L1 1"
        stroke={currentColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default memo(ArrowDownIcon);
