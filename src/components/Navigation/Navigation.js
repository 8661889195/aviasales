import { useDispatch, useSelector } from 'react-redux';
import { NavigationItem } from '../NavigationItem/NavigationItem';
import classes from './Navigation.module.css';

export const Navigation = () => {
  const { navigation, tabActive } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return(
    <ul className={classes.navigationContainer}>
      {navigation.map((navItem, index) => (
        <NavigationItem 
        text={navItem}
        tabActive={tabActive}
        index={index}
        dispatch={dispatch}
        key={navItem}
        />
      ))}
    </ul>
  )
}