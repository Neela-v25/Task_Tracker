import { useDispatch } from "react-redux";
import { boardActions } from "../../store/boardSlice";
import { BOARD_THEMES } from "../../utils/boardThemes";
import MenuCard from "../../components/MenuCard";

export default function BackgroundMenu({ position }){
    const dispatch = useDispatch();
  
    const handleClick = (theme) => {
      dispatch(boardActions.setBackgroundTheme(theme));
      dispatch(boardActions.setDropDownAction(""));
    };
  
    return (
      <MenuCard position={position} cardTitle="Themes">
        <div className="grid grid-cols-2 gap-3">
          {BOARD_THEMES.map((theme) => (
            <div
              key={theme}
              className={`${theme} h-35 w-35 rounded-md cursor-pointer hover:shadow-2xl`}
              onClick={() => handleClick(theme)}
            ></div>
          ))}
        </div>
      </MenuCard>
    );
  };