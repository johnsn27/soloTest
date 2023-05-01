import moment from 'moment';

interface Props {
  day: string;
}

const DayItem = ({ day }: Props) => {
  const formattedDay = moment(day).format("MMM Do YYYY");
  return <button className="dayItem">{formattedDay}</button>;
};

export default DayItem;
