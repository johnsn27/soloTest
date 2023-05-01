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
    const days: string[] = [];
    
    while (startDate.isSameOrBefore(endDate)) {
      const currentDate = startDate.toString();
      this.days.push(currentDate);
      startDate.add(1, "day");
    }
    
    
    this.times = [6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75];
  }

  requestBooking = () => {
    alert("Booking requested!");
  };
}

export default RootStore;
