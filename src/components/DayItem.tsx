import moment from 'moment';
import RootStore from '../RootStore';

interface Props {
  day: string;
  rootStore: RootStore;
}

const DayItem = ({ day, rootStore }: Props) => {
  const formattedDay = moment(day).format("MMM Do YYYY");
  const { selectedDay, setSelectedDay } = rootStore;

  const handleClick = () => {
    setSelectedDay(day);
  };
  
  return <button className="dayItem" onClick={handleClick}>{formattedDay}</button>;
};

export default DayItem;
