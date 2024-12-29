import { useEffect } from "react";
import edit from "./../assets/edit.png";
import logo from "./../assets/logo.png";
import ham from "./../assets/ham.png";
import useMediaQuery from "@mui/material/useMediaQuery";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ showSideBar, setShowSideBar }) => {
  const isMdScreen = useMediaQuery("(min-width:640px)");
  useEffect(() => {
    setShowSideBar(isMdScreen);
  }, [isMdScreen]);

  return (
    <>
      {!showSideBar && (
        <div className="sm:hidden flex gap-3 p-3">
          <img
            onClick={() => setShowSideBar((prev) => !prev)}
            className=""
            src={ham}
            alt="ham"
          />
          <h2 className="font-bold text-[#9785BA] text-2xl">Bot AI</h2>
        </div>
      )}
      {showSideBar && (
        <div className="w-[45vw] h-[100vh] bg-white absolute md:w-[25vw] flex flex-col items-center gap-2">
          <h2 className="flex justify-around items-center gap-3 bg-[#D7C7F4] w-full font-semibold">
            <img className="w-[35px]" src={logo} alt="logo" />
            New Chat
            <img className="w-[35px] bg-[#D7C7F4]" src={edit} alt="edit" />
          </h2>
          <button className="bg-[#D7C7F4] rounded-md inline-block max-w-[30vw] px-3 py-2 text-sm font-bold">
            Past Conversations
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
