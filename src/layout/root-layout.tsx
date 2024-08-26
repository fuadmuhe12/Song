import { NavLink, Outlet } from "react-router-dom";
import SearchFeature from "../components/search";
import { AddIcon, HomeIcon } from "../components/Icons";

export default function RootLayout() {
  return (
    <div className="wrapper flex max-w-screen-xl mx-auto min-h-screen  gap-2 px-1 py-1">
      <div className="SideBar basis-1/5 flex flex-col gap-y-2">
        <div className="Logo flex items-center bg-Middle h-[50px] md:h-[80px] rounded-lg shrink-0">
          <img src="./icons/logo.png" alt="logo" width={60} />
          <span className="hidden lg:block text-white lg:text-3xl font-semibold">
            Songs
          </span>
        </div>
        <nav className="px-4 flex flex-col gap-y-4 py-4 bg-Middle rounded-lg h-full">
          <NavLink to="/">
            <div className="text-TextDark flex gap-x-2 hover:text-white">
              <HomeIcon className="text-gray-400" />
              <span className="hidden lg:block">Home</span>
            </div>
          </NavLink>
          <NavLink to="/add-Song">
            <div className="text-TextDark flex gap-x-2 hover:text-white">
              <AddIcon className="text-gray-400" />
              <span className="hidden lg:block">Add Song</span>
            </div>
          </NavLink>
        </nav>
      </div>
      <div className="RightSide w-full flex flex-col gap-2">
        <div className="HeaderNav bg-Middle h-[50px] md:h-[80px] rounded-lg flex items-center pl-[20px] md:pl[50px]">
          <div>
            <SearchFeature />
          </div>
        </div>
        <div className="contentSpace  rounded-lg">{<Outlet />}</div>
      </div>
    </div>
  );
}
