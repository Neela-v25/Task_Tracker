import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { boardActions } from '../../store/boardSlice';

function TabComponent() {
    const dispatch = useDispatch();
    const handleSwitch = () => {
        dispatch(boardActions.openDialog('switch'))
    }
  return (
    <div className='mb-1 ml-auto mr-auto'>
        <Button variant='contained' onClick={handleSwitch}>Switch</Button>
    </div>
  )
}

export default TabComponent