import moment from 'moment';
import RootStore from '../RootStore';

interface Props {
  time: number;
  rootStore: RootStore
}

const TimeItem = ({ time, rootStore }: Props) => {
  const { selectedTime, setSelectedTime } = rootStore;

  const handleClick = () => {
    setSelectedTime(time);
  };

  const hours = Math.floor(time);
  const minutes = (time - hours) * 60;

  const formattedTime = moment()
    .hour(hours)
    .minute(minutes)
    .format('h:mm A');


    return (
      <button
        className={`timeItem ${selectedTime === time ? "selected" : ""}`}
        onClick={handleClick}
      >
        {time}
      </button>
    );
};

export default TimeItem;
