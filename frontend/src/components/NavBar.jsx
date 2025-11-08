import Button from "@mui/material/Button";
import { useState } from "react";
import CreateBoardMenu from "../features/Board/CreateBoard";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="flex justify-between items-center p-6 ml-50">
      <div className="flex items-center w-5/6 gap-4">
        <input
          type="text"
          className="w-2/4 h-8 border border-black outline-none p-3"
        />
        <Button variant="contained" className="relative" onClick={handleClick}>
          Create
        </Button>
        {isMenuOpen && <CreateBoardMenu position="top-20 right-60" closeMenu={() => setIsMenuOpen(false)} />}
      </div>
    </div>
  );
}

export default NavBar;
