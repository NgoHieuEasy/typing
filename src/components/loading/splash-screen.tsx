import ScaleLoader from "react-spinners/ScaleLoader";

export function SplashScreen() {
  return (
    <div
      className={`absolute inset-0 bg-main-light-color  flex items-center justify-center z-50`}
    >
      <div className="relative flex justify-center items-center">
        <div
          className="border-[3px] border-gray-400 w-[100px] h-[100px] rounded-xl animate-spin absolute"
          style={{ animationDuration: "1.5s" }}
        ></div>
        <ScaleLoader
          height={16}
          color="#ffffff"
          loading={true}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div
          className="border-[6px] border-white-400 w-[100px] h-[100px] rounded-[30px] animate-spin absolute"
          style={{ animationDuration: "2s" }}
        ></div>
      </div>
    </div>
  );
}
