import moment from 'moment-timezone';

export const formatCurrentDate = () => {
    return moment().tz("America/Caracas").format("DD-MM-YYYY, hh:mm:ss a");
}