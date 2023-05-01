import { makeObservable, observable, action } from "mobx";
import moment from 'moment';
import { FormatDateDDMY } from "./helpers/formatDate";
import FormatTime from "./helpers/formatTime";

class RootStore {
  days: string[] = [];
  selectedDay: string | null = null;
  selectedTime: number | null = null;
  times: number[] = [];
  periods = ["Anytime", "Morning", "Afternoon", "Evening"];
  selectedPeriod: string | null = null;

  constructor() {
    makeObservable(this, {
      days: observable,
      times: observable,
      selectedDay: observable,
      setSelectedDay: action,
      selectedTime: observable,
      setSelectedTime: action,
      selectedPeriod: observable,
      setSelectedPeriod: action,
    });

    const startDate = moment().startOf("day");
    const endDate = moment().add(27, "days").startOf("day");
    
    while (startDate.isSameOrBefore(endDate)) {
      const currentDate = startDate.toString();
      this.days.push(currentDate);
      startDate.add(1, "day");
    }
    
    this.selectedDay = this.days[0];
    this.selectedPeriod = this.periods[0];

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
    this.selectedTime = null;
  });

  setSelectedTime = action((time: number) => {
    this.selectedTime = time;
  });

  setSelectedPeriod = action((period: string | null) => {
    this.selectedPeriod = period;
  });

  requestBooking = () => {
    alert("Booking requested!");
  };

  get selectedDateTime() {
    if (this.selectedDay && this.selectedTime) {
      const formattedDate = FormatDateDDMY(this.selectedDay)
      const formattedTime = FormatTime(this.selectedTime)
      const dateTime = formattedTime + ' on ' + formattedDate;
      return dateTime;
    } else {
      return "Please select a time";
    }
  }
}

export default RootStore;
