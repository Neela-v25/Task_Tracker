import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import { BOARD_THEMES } from "../utils/boardThemes";

function DropdownMenu({ menuList, position, onClose, menuAction }) {

  const handleClick = (e, menuItem) => {
    e.stopPropagation();
    onClose()
    if(Array.isArray(menuAction.params)){
      menuAction.action(...menuAction.params, menuItem)
    }else{
      menuAction.action(menuAction.params)
    }
  };

  return (
    <div className={`absolute ${position} bg-white h-fit w-50 p-3 rounded shadow-md`}>
      <menu>
        {menuList.map((item) => (
          <li
            key={item}
            className="hover:bg-gray-100 cursor-pointer p-1 z-40"
            onClick={(e) => handleClick(e, item)}
          >
            {item}
          </li>
        ))}
      </menu>
    </div>
  );
}

export const BackgroundMenu = ({ position }) => {
  const dispatch = useDispatch();

  const handleClick = (theme) => {
    dispatch(boardActions.setBackgroundTheme(theme))
    dispatch(boardActions.setDropDownAction(""));
  };

  return (
    <div
      className={`absolute ${position} bg-white h-100 w-80 overflow-y-auto p-3 rounded`}
    >
      <h6 className="text-center mb-2">Themes</h6>
      <div className="grid grid-cols-2 gap-3">
        {BOARD_THEMES.map((theme) => (
          <div
            key={theme}
            className={`${theme} h-35 w-35 rounded-md cursor-pointer hover:shadow-2xl`}
            onClick={() => handleClick(theme)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
