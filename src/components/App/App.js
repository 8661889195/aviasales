import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, getToken } from '../services/mainSlice';
import { Ticket } from '../Ticket/Ticket';
import { Navigation } from '../Navigation/Navigation';
import { Filter } from '../Filter/Filter';
import filter from '../helperFunction/filter';
import sort from '../helperFunction/sort';
import LogoIcon from '../LogoIcon';
import classes from './App.module.css';

export const App = () => {
  const { tabActive, transfers } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const { token, stop, pending } = useSelector((state) => state.main);

  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, [token]);

  useEffect(() => {
    if (token && !stop && !pending) {
      dispatch(getTickets());
    }
  }, [token, stop, pending]);

  const ticketsFromServer = useSelector((state) => state.main.ticketsFromServer);

  const [count, setCount] = useState(5);
  const sortedTickets = filter(sort([...ticketsFromServer], tabActive), transfers);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LogoIcon />
      </div>
      <div className={classes.mainContent}>
        <Filter />
        <div className={classes.content}>
          <Navigation />
          <div className={classes.tickets}>
            {sortedTickets.length
              ? sortedTickets.map((offer, index) => {
                  if (index >= count) return;
                  return <Ticket data={offer} key={`${offer.price}${offer.carrier}${offer.segments[0].duration}`} />;
                })
              : transfers.every((el) => !el.status)
                ? 'Вы не выбрали ни одного фильтра'
                : !stop
                  ? 'Ожидайте окончения поиска'
                  : 'Билетов по заданным параметрам не найденно.'}
            {sortedTickets.length > count ? (
              <button className={classes.addTickets} onClick={() => setCount((count) => count + 5)}>
                Показать еще 5 билетов
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
