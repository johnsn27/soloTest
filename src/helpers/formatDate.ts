import moment from "moment";

const FormatDateMDY = (date : string) => { // format date in format Jan 5th 2021
    const formattedDate = moment(date).format("MMM Do YYYY");
    return formattedDate;
}

export { FormatDateMDY};
