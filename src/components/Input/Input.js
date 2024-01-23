import { useDispatch } from 'react-redux';
import { setTransferStatus, setTransferStatusAll } from '../services/mainSlice';
import classes from './Input.module.css';

export const Input = ({ text, name, checked, index = -1 }) => {
  const dispatch = useDispatch();
  return (
    <label htmlFor={name} className={classes.label}>
      <input
        type="checkbox"
        className={classes.input}
        // checked={checked}
        defaultChecked={checked}
        id={name}
        name={name}
        onClick={() => {
          if (index !== -1) dispatch(setTransferStatus(index));
          if (index === -1) dispatch(setTransferStatusAll());
        }}
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M8.28571 14L4 10.1612L5.20857 9.0787L8.28571 11.8273L14.7914 6L16 7.09021L8.28571 14Z"
          fill="#2196F3"
        />
      </svg>
      {text}
    </label>
  );
};
