import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boardActions } from "../store/boardSlice";

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const boards = useSelector((state) => state.board.boards);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchText) {
      setSearchResults(boards);
    }
    const temp = boards.filter((item) =>
      item.boardName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(temp);
  }, [searchText, boards]);

  const onSearch = (e) => {
    setIsSearchOpen(true);
    setSearchText(e.target.value);
  };

  const onSelectBoard = (board) => {
    dispatch(boardActions.setActiveBoard(board));
    navigate(`/${board.boardId}/${board.boardName}`);
    setIsSearchOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full h-8 border border-gray-300 rounded outline-none p-3"
        placeholder="Search for a board"
        value={searchText}
        onChange={onSearch}
        onFocus={() => setIsSearchOpen(true)}
      />
      {isSearchOpen && (
        <ul className="absolute border border-gray-300 bg-white z-40 p-4 list-none w-full rounded top-10 shadow-md">
          {searchResults.map((item) => (
            <li
              className="p-1 hover:bg-gray-200 cursor-pointer not-last:border-b not-last:border-b-gray-200"
              key={item.boardId}
              onClick={() => onSelectBoard(item)}
            >
              {item.boardName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
