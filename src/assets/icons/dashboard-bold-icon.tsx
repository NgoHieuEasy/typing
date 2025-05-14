import { memo } from "react";
interface Props {
  currentColor?: string;
}
function DashboardBoldIcon({ currentColor = "#202654" }: Props) {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="12" height="12" fill={currentColor} />
      <rect x="8" y="7" width="12" height="12" fill={currentColor} />
    </svg>
  );
}

export default memo(DashboardBoldIcon);
