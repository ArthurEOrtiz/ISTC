import moment from 'moment-timezone';

export const formatToMountainTime = (utcDate: Date, formatString: string): string => {
    const mountainTime = moment.utc(utcDate).tz('America/Denver').format(formatString);
    return mountainTime;
}