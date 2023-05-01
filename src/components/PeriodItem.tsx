import RootStore from '../RootStore'
import { observer } from "mobx-react-lite";

interface Props {
  period: string;
  rootStore: RootStore;
}

const PeriodItem = observer(({ period, rootStore }: Props) => {
  const { selectedPeriod, setSelectedPeriod } = rootStore;

  const handleClick = () => {
    setSelectedPeriod(period);
  };

  return (
    <button
      className={`periodItem ${selectedPeriod === period ? "selected" : ""}`}
      onClick={handleClick}
    >
      {period}
    </button>
  );
};

export default PeriodItem;
