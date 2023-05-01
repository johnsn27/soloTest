import moment from 'moment';

interface Props {
  time: number;
}

const TimeItem = ({ time }: Props) => {

  const hours = Math.floor(time);
  const minutes = (time - hours) * 60;

  const formattedTime = moment()
    .hour(hours)
    .minute(minutes)
    .format('h:mm A');


  return <button className="timeItem">{formattedTime}</button>;
};

export default TimeItem;
