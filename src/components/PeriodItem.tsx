import RootStore from '../RootStore'

interface Props {
  period: string;
  rootStore: RootStore;
}

const PeriodItem = ({ period, rootStore }: Props) => {
  const { selectedPeriod, setSelectedPeriod } = rootStore;

  const handleClick = () => {
    setSelectedPeriod(period);
  };

  return <button className="periodItem" onClick={handleClick}>{period}</button>;
};

export default PeriodItem;
