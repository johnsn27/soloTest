import RootStore from '../RootStore';
import { observer } from "mobx-react-lite";
import FormatTime from '../helpers/formatTime';

interface Props {
  time: number;
  rootStore: RootStore
}

const TimeItem = observer(({ time, rootStore }: Props) => {
  const { selectedTime, setSelectedTime } = rootStore;

  const handleClick = () => {
    setSelectedTime(time);
  };

  const formattedTime = FormatTime(time)


    return (
      <button
        className={`timeItem ${selectedTime === time ? "selected" : ""}`}
        onClick={handleClick}
      >
        {formattedTime}
      </button>
    );
  });

export default TimeItem;
