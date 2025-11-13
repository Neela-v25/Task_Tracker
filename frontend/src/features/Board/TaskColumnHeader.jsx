import MenuCard from "../../components/MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../store/boardSlice";
import { LIST_COLORS } from "../../utils/boardThemes";
import Button from "@mui/material/Button";

function TaskColumnHeader({ title, onColorChange }) {
  const dropDownAction = useSelector((state) => state.board.dropDownAction);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(boardActions.setDropDownAction(title.toLowerCase()));
  };
  return (
    <div className="flex justify-between items-center">
      <h6 className="text-center font-medium mb-2">{title}</h6>
      <div className="relative">
        <sup className="font-bold text-xl cursor-pointer" onClick={handleClick}>
          ...
        </sup>
        {dropDownAction === title.toLowerCase() && (
          <MenuCard cardTitle="Change list color" position="-left-4">
            <div className="grid grid-cols-5 gap-4 mt-5">
              {LIST_COLORS.map((item) => (
                <div
                  key={item}
                  className={`${item} h-10 w-10 cursor-pointer`}
                  onClick={() => onColorChange(title, item)}
                ></div>
              ))}
            </div>
            <Button
              variant="contained"
              sx={{ backgroundColor: "gray", marginTop: "30px" }}
              onClick={() => {}}
            >
              Remove color
            </Button>
          </MenuCard>
        )}
      </div>
    </div>
  );
}

export default TaskColumnHeader;
