import RootStore from '../RootStore';
import moment from 'moment';
import { observer } from "mobx-react-lite";
import FormatTime from '../helpers/formatTime';

interface Props {
  time: number;
  rootStore: RootStore
}

const TimeItem = observer(({ time, rootStore }: Props) => {
  const { selectedTime, setSelectedTime, selectedDay } = rootStore;

  const handleClick = () => {
    setSelectedTime(time);
  };

  const formattedTime = FormatTime(time)

  const isDisabled = () => {
    if (!selectedDay) {
      return true;
    }

    const now = moment();
    const selectedDateTime = moment(selectedDay, "MMM Do YYYY").add(time, "hours");
    const twoHoursFromNow = moment().add(2, "hours");

    return now.isSameOrAfter(selectedDateTime) || selectedDateTime.isBefore(twoHoursFromNow);
  };


    return (
      <button
        className={`timeItem ${selectedTime === time ? "selected" : ""} ${isDisabled() ? "disabled" : ""}`}
        onClick={handleClick}
        disabled={isDisabled()}
      >
        {formattedTime}
      </button>
    );
  });

export default TimeItem;
