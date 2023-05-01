import { useStore } from "../App";
import { observer } from "mobx-react-lite";

const Footer = observer(() => {
  const rootStore = useStore();

  const handleBookNow = () => {
    rootStore.requestBooking();
  };

  return (
    <div className="footer">
      <div>
        <p>
        <b>{rootStore.selectedDateTime}</b>
        </p>
        <p>0 professionals available</p>
      </div>
      <button className="bookButton" onClick={handleBookNow} >Book Now</button>
    </div>
  );
});

export default Footer;
