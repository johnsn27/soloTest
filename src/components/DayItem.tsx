import moment from 'moment';
import RootStore from '../RootStore';
import { observer } from "mobx-react-lite";

interface Props {
  day: string;
  rootStore: RootStore;
}

const DayItem = observer(({ day, rootStore }: Props) => {
  const formattedDay = moment(day).format("MMM Do YYYY");
  const { selectedDay, setSelectedDay } = rootStore;

  const handleClick = () => {
    setSelectedDay(day);
  };

  console.log('selectedDay', selectedDay)
  console.log('day', day)
  
  return (
    <button
      className={`dayItem ${selectedDay === day ? "selected" : ""}`}
      onClick={handleClick}
    >
      {formattedDay}
    </button>
  );
});

export default DayItem;
