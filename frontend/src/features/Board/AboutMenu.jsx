import { useSelector } from "react-redux";
import MenuCard from "../../components/MenuCard";
import PersonIcon from '@mui/icons-material/Person';

export default function AboutMenu({ position }){
    const activeBoard = useSelector(state => state.board.activeBoard);
  
    return (
      <MenuCard position={position} cardTitle="About this board">
        <div className="flex flex-col gap-6">
            <div className="flex gap-3">
                <PersonIcon />
                <h3>Neela Mani</h3>
            </div>
            <hr />
            <h5>Description</h5>
            <p>{activeBoard.boardDesc}</p>
        </div>
      </MenuCard>
    );
  };