import ScaleLoader from "react-spinners/ScaleLoader";
interface Props {
  text: string;
  isLoading?: boolean;
  className?: string;
  onClick: () => void;
}
const SecondButton = ({ text, isLoading, className, onClick }: Props) => {
  return (
    <button
      type="submit"
      onClick={isLoading ? () => {} : onClick}
      className={` w-full flex font-normal h-[47px] mt-3 text-white text-[16px]  py-[16px] justify-center items-center gap-[10px] rounded-[10px] bg-main-light-color shadow-[0px_12px_21px_4px_rgba(68,97,242,0.15)] hover:bg-[#181e46] ${className}`}
    >
      {isLoading ? (
        <ScaleLoader
          height={16}
          color="#ffffff"
          loading={true}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default SecondButton;
