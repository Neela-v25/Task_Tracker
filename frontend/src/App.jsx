import {BrowserRouter, Routes, Route, Navigate} from "react-router"
import UserBoard from "./pages/UserBoard";
import { useSelector } from "react-redux";

function App() {

  const defaultBoard = useSelector(state => state.board.activeBoard)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={`/${defaultBoard.boardId}/${defaultBoard.boardName}`} replace />} />
        <Route path='/:boardId/:boardName' element={<UserBoard />} index />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
