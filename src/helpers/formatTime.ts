import moment from "moment";

  const FormatTime = ( time : number) => {
    
    const hours = Math.floor(time);
    const minutes = (time - hours) * 60;
  
    const formattedTime = moment()
      .hour(hours)
      .minute(minutes)
      .format('h:mm A');

    return formattedTime;
}

export default FormatTime;
