import { format } from 'date-fns';
import classes from './Ticket.module.css';

export const Ticket = ({ data }) => {
  const dateFrom = new Date(data.segments[0].date);
  const dateFromDuration = data.segments[0].duration * 1000 * 60;
  const dateTo = new Date(data.segments[1].date);
  const dateToDuration = data.segments[1].duration * 1000 * 60;

  return (
    <div className={classes.offer}>
      <div className={classes.price}>
        <p>{data.price}</p>
        <img src={`https://pics.avs.io/99/36/${data.carrier}.png`} alt="logo" />
      </div>
      <div className={classes.offerInfo}>
        <div className={classes.column}>
          <div>
            <div className={classes.aloneValue}>{`${data.segments[0].origin} - ${data.segments[0].destination}`}</div>
            <div className={classes.aloneValue}>
              {`${format(dateFrom, 'HH:mm')} - ${format(new Date(dateFrom.getTime() + dateFromDuration), 'HH:mm')}`}
            </div>
          </div>
          <div>
            <div className={classes.aloneValue}>{`${data.segments[1].origin} - ${data.segments[1].destination}`}</div>
            <div className={classes.aloneValue}>
              {`${format(dateTo, 'HH:mm')} - ${format(new Date(dateTo.getTime() + dateToDuration), 'HH:mm')}`}
            </div>
          </div>
        </div>
        <div className={classes.column}>
          <div>
            <div className={classes.firstValue}>в пути</div>
            <div className={classes.secondValue}>{format(dateFromDuration, 'HHч mmм')}</div>
          </div>
          <div>
            <div className={classes.firstValue}>в пути</div>
            <div className={classes.secondValue}>{format(dateToDuration, 'HHч mmм')}</div>
          </div>
        </div>
        <div className={classes.column}>
          <div>
            <div className={classes.firstValue}>
              {`${data.segments[0].stops.length} ${data.segments[0].stops.length === 1 ? 'Пересадка' : data.segments[0].stops.lenght === 0 ? 'Пересадок' : 'Пересадки'}`}
            </div>
            <div className={classes.secondValue}>{`${data.segments[0].stops.join(', ')}`}</div>
          </div>
          <div>
            <div className={classes.firstValue}>
              {`${data.segments[1].stops.length} ${data.segments[1].stops.length === 1 ? 'Пересадка' : data.segments[0].stops.lenght === 0 ? 'Пересадок' : 'Пересадки'}`}
            </div>
            <div className={classes.secondValue}>{`${data.segments[1].stops.join(', ')}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
