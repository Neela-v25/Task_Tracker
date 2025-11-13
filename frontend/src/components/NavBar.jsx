import Button from "@mui/material/Button";
import { useState } from "react";
import CreateBoardMenu from "../features/Board/CreateBoardModal";
import SearchBar from "./SearchBar";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="flex justify-between items-center p-6 ml-50">
      <div className="flex items-center w-5/6 gap-4">
        <SearchBar />
        <div className="relative">
          <Button variant="contained" onClick={handleClick}>
            Create
          </Button>
          {isMenuOpen && (
            <CreateBoardMenu
              position="top-15"
              closeMenu={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
