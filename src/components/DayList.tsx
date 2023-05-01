import { useStore } from "../App";
import DayItem from "./DayItem";

const DayList = () => {
  const rootStore = useStore();

  return (
    <div className="dayList">
      {rootStore.days.map((d) => (
        <DayItem day={d} key={d} rootStore={rootStore} />
      ))}
    </div>
  );
};

export default DayList;
