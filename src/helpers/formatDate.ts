import moment from "moment";

const FormatDateMDY = (date : string) => { // format date in format Jan 5th 2021
    const formattedDate = moment(date).format("MMM Do YYYY");
    return formattedDate;
}

const FormatDateDDMY = (date : string) => { // format date in format Tue 2nd January 21
    const formattedDate = moment(date).format('ddd Do MMMM YY');
    return formattedDate;
}

export { FormatDateMDY, FormatDateDDMY};
