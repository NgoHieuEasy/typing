import { memo } from "react";
interface Props {
  currentColor?: string;
}
function InvestmentFundIcon({ currentColor = "#202654" }: Props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.24894 20.1656H13.7489C18.3323 20.1656 20.1656 18.3323 20.1656 13.7489V8.24894C20.1656 3.66561 18.3323 1.83228 13.7489 1.83228H8.24894C3.66561 1.83228 1.83228 3.66561 1.83228 8.24894V13.7489C1.83228 18.3323 3.66561 20.1656 8.24894 20.1656Z"
        stroke={currentColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.71582 13.2816L8.89749 10.4491C9.20915 10.0457 9.78665 9.97239 10.19 10.2841L11.8675 11.6041C12.2708 11.9157 12.8483 11.8424 13.16 11.4482L15.2775 8.71655"
        stroke={currentColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default memo(InvestmentFundIcon);
