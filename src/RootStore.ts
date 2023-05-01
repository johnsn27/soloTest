import { makeObservable, observable } from "mobx";
import moment from 'moment';

class RootStore {
  days: string[] = [];
  times: number[] = [];
  periods = ["Anytime", "Morning", "Afternoon", "Evening"];

  constructor() {
    makeObservable(this, {
      days: observable,
      times: observable,
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
      for (let minute = 0; minute < 60; minute += 15) {
        const time = Number(`${hour}.${minute.toString().padStart(2, '0')}`);
        this.times.push(time);
      }
    }

  }

  requestBooking = () => {
    alert("Booking requested!");
  };
}

export default RootStore;
