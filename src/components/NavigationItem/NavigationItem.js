import { setTab } from '../services/mainSlice';
import classes from './NavigationItem.module.css';

export const NavigationItem = ({ text, index, tabActive, dispatch }) => {
  function handleChangeTab() {
    dispatch(setTab(index));
  }

  return (
    <li className={`${classes.navigationItem} ${tabActive === index && 'active'}`} onClick={handleChangeTab}>
      {text}
    </li>
  );
};
