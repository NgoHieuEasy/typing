
// ----------------------------------------------------------------------

import HomeView from "@/sections/home/home-view";

const metadata = "Home";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <HomeView />
      </div>
    </>
  );
}
