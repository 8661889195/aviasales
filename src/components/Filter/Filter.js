import { useSelector } from 'react-redux';
import { Input } from '../Input/Input';
import classes from './Filter.module.css';

export const Filter = () => {
  const { options, transfers } = useSelector((state) => state.main);

  return (
    <div className={classes.filter}>
      <p>Количество пересадок</p>
      <div className={classes.inputsContainer}>
        <Input text="Все" name="all" key={'all'} checked={transfers.every((el) => el.status)} />
        {options.map((optionObj, index) => (
          <Input
            text={optionObj.text}
            index={index}
            name={optionObj.name}
            key={index}
            checked={transfers[index].status}
          />
        ))}
      </div>
    </div>
  );
};
