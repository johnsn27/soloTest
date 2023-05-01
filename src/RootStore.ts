import { makeObservable, observable, action } from "mobx";
import moment from 'moment';

class RootStore {
  days: string[] = [];
  selectedDay: string | null = null;
  selectedTime: number | null = null;
  times: number[] = [];
  periods = ["Anytime", "Morning", "Afternoon", "Evening"];

  constructor() {
    makeObservable(this, {
      days: observable,
      times: observable,
      selectedDay: observable,
      setSelectedDay: action,
      selectedTime: observable,
      setSelectedTime: action,
    });

    const startDate = moment().startOf("day");
    const endDate = moment().add(27, "days").startOf("day");
    
    while (startDate.isSameOrBefore(endDate)) {
      const currentDate = startDate.toString();
      this.days.push(currentDate);
      startDate.add(1, "day");
    }

    this.times = [];

    for (let hour = 6; hour < 22; hour++) {
      for (let minute = 0; minute < 100; minute += 25) {
        const time = Number(`${hour}.${minute.toString()}`);
        this.times.push(time);
      }
    }
  }
  
  setSelectedDay = action((day: string | null) => {
    this.selectedDay = day;
  });

  setSelectedTime = action((time: number) => {
    this.selectedTime = time;
  });

  requestBooking = () => {
    alert("Booking requested!");
  };
}

export default RootStore;
