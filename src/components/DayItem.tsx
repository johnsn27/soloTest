import RootStore from '../RootStore';
import { observer } from "mobx-react-lite";
import { FormatDateMDY } from '../helpers/formatDate';

interface Props {
  day: string;
  rootStore: RootStore;
}

const DayItem = observer(({ day, rootStore }: Props) => {
  const formattedDay = FormatDateMDY(day);
  const { selectedDay, setSelectedDay } = rootStore;

  const handleClick = () => {
    setSelectedDay(day);
  };
  
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
