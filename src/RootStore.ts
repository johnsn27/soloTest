import { makeObservable, observable, action } from "mobx";
import moment from 'moment';
import { FormatDateDDMY } from "./helpers/formatDate";
import FormatTime from "./helpers/formatTime";
import mockApi from "./mockApi";

class RootStore {
  days: string[] = [];
  selectedDay: string | null = null;
  selectedTime: number | null = null;
  times: number[] = [];
  periods = ["Anytime", "Morning", "Afternoon", "Evening"];
  filteredTimes: number[] = [];
  allTimes: number[] = [];
  selectedPeriod: string | null = null;

  constructor() {
    makeObservable(this, {
      days: observable,
      times: observable,
      filteredTimes: observable,
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
    this.filteredTimes = this.times.slice();
    this.allTimes = this.times;
    this.setSelectedPeriod(this.selectedPeriod);
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
    console.log('this.selectedPeriod', this.selectedPeriod)
    const startTime = this.getStartTime(period || ""); // add null check for period
    const endTime = this.getEndTime(period || ""); // add null check for period
    const filteredTimes = this.filterTimes(startTime, endTime);
    console.log('filteredTimes', filteredTimes)
    const filteredTimesCopy = [...filteredTimes]; // make a copy of filtered times
    this.times = this.allTimes.filter((time) => filteredTimesCopy.includes(time));
    this.selectedTime = null; // clear selectedTime when a new period is selected
  });

  requestBooking = async () => {
    const dayOfMonth = parseInt(this.selectedDay.split(" ")[2]);
    const numPros = await mockApi.getNumberOfPros(dayOfMonth);
    const dateTime = this.selectedDateTime;
    const message = `Your booking has been made for ${dateTime}. We have sent your request to ${numPros} professional${numPros === 1 ? "" : "s"}.`;
    alert(message);
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

  getStartTime = (period: string) => {
    console.log('period', period)
    switch (period) {
      case "Anytime":
        return 6;
      case "Morning":
        return 6;
      case "Afternoon":
        return 12;
      case "Evening":
        return 15;
      default:
        return 6;
    }
  };

  getEndTime = (period: string) => {
    switch (period) {
      case "Anytime":
        return 9.75;
      case "Morning":
        return 11.75;
      case "Afternoon":
        return 16.75;
      case "Evening":
        return 21.75;
      default:
        return 21.75;
    }
  };  
  
  filterTimes = (startTime: number, endTime: number) => {
    console.log('filteredTimes', this.filteredTimes)
    return this.filteredTimes.filter((time) => {
      return time >= startTime && time <= endTime;
    });
  };
}

export default RootStore;
