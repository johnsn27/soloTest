import { useStore } from "../App";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import mockApi from "../mockApi";

const Footer = observer(() => {
  const rootStore = useStore();
  const [numberOfPros, setNumberOfPros] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookNow = () => {
    rootStore.requestBooking();
  };

  const isTimeSelected = !!rootStore.selectedTime;

  useEffect(() => {
    const fetchPros = async () => {
      if (rootStore.selectedDay) {
        setIsLoading(true);
        const dayOfMonth = parseInt(rootStore.selectedDay.split(" ")[2]);
        const numberOfPros = await mockApi.getNumberOfPros(dayOfMonth);
        setNumberOfPros(numberOfPros);
        setIsLoading(false);
      }
    };

    fetchPros();
  }, [rootStore.selectedDay]);

  return (
    <div className="footer">
      <div>
        <p>
        <b>{rootStore.selectedDateTime}</b>
        </p>
        {isLoading ? (
          <p>...</p>
        ) : numberOfPros !== null ? (
          <p>
            {numberOfPros} professional{numberOfPros !== 1 && "s"} available
          </p>
        ) : (
          <p>Please select a day</p>
        )}
      </div>
      <button
        className="bookButton"
        onClick={handleBookNow}
        disabled={!isTimeSelected || numberOfPros === 0 || isLoading}
      >
        Book Now
      </button>
    </div>
  );
});

export default Footer;
