import { memo } from "react";
interface Props {
  currentColor?: string;
}
function DashboardIcon({ currentColor = "#202654" }: Props) {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="11" height="11" stroke={currentColor} />
      <rect x="8.5" y="7.5" width="11" height="11" stroke={currentColor} />
    </svg>
  );
}

export default memo(DashboardIcon);
