import dayjs, { ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';

abstract class DateTimeHelper {
  private static formats = {
    dateAndHourDisplay: 'MM/DD/YYYY - hh:mm A',
    onlyDate: 'MM-DD-YYYY',
    dateAndHour: 'MM-DD-YYYY-HH:mm:ss',
  } as const;

  static formatDate(
    date?: string | Date | null,
    configs?: {
      format?: keyof typeof DateTimeHelper.formats;
      ignoreClientTimeZone?: boolean;
    }
  ) {
    if (!date) {
      return '';
    }

    let day;

    if (configs?.ignoreClientTimeZone) {
      dayjs.extend(utc);
      day = dayjs.utc(date);
    } else {
      day = dayjs(date);
    }

    return day.format(
      DateTimeHelper.formats?.[configs?.format as keyof typeof DateTimeHelper.formats] ?? DateTimeHelper.formats.dateAndHourDisplay
    );
  }

  static subtractDays(date: string, days: number) {
    const day = dayjs(date);

    return day.subtract(days, 'days').format('MM-DD-YYYY');
  }

  static removeTime(date: Date) {
    if (!date) {
      return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static subtractDaysDate(date: Date, days: number) {
    const day = dayjs(date);
    return day.subtract(days, 'days');
  }

  static removeIsoHours(date?: Date) {
    if (!date) {
      return null;
    }

    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  static dateWithoutTimezone(date: Date) {
    if (!date) {
      return null;
    }
    return new Date(date.toISOString().slice(0, -1));
  }

  static addMinutes(date: Date, minutes: number) {
    return dayjs(date).add(minutes, 'minutes').toDate();
  }

  static removeTimezoneOffset(date: Date) {
    return dayjs(date).subtract(date.getTimezoneOffset(), 'minutes').toDate();
  }

  static areDateEquals(dateOne?: string | Date, dateTwo?: string | Date) {
    if (!dateOne || !dateTwo) {
      return false;
    }

    const first = dayjs(dateOne);
    const second = dayjs(dateTwo);

    return first.diff(second, 'day') === 0;
  }

  today = dayjs();

  static toDate(date: string) {
    return dayjs(date).format();
  }

  static toStartOfDay(date: Date) {
    date.setUTCHours(0, 0, 0, 0);
    return new Date(date);
  }

  static toEndOfTheDay(date: Date) {
    date.setHours(23, 59, 59, 999);
    const day = dayjs(date);
    return day.subtract(1, 'days');
  }

  static isDateOneBeforeTwoByCertainTime({
    dateOne,
    dateTwo,
    time,
  }: {
    dateOne: Date;
    dateTwo: Date;
    time: { value: number; unit: ManipulateType };
  }) {
    if (!dayjs(dateOne).isValid() || !dayjs(dateTwo).isValid()) {
      console.error('Helper: isDateOneBeforeTwoByCertainTime | Error: One of the arguments passed as date isn`t one');
      return false;
    }

    return dayjs(dateOne).add(time.value, time.unit) >= dayjs(dateTwo);
  }

  static getLastWeekRange() {
    return {
      start: dayjs().subtract(1, 'week').startOf('week').add(1, 'day').format(DateTimeHelper.formats.onlyDate),
      end: dayjs().subtract(1, 'week').endOf('week').add(1, 'day').format(DateTimeHelper.formats.onlyDate),
    };
  }

  static formatTimeFromDelta(start: string, end: string): string {
    if (start !== null && end !== null) {
      let msec: number = (new Date(end) as unknown as number) - (new Date(start) as unknown as number);
      const hours = Math.floor(msec / 1000 / 60 / 60);
      msec -= hours * 1000 * 60 * 60;
      const minutes = Math.floor(msec / 1000 / 60);
      msec -= minutes * 1000 * 60;
      const seconds = Math.floor(msec / 1000);

      const mappedHours = hours ? `${hours}h :` : '';
      const mappedMinutes = minutes ? `${minutes}m :` : '';

      return mappedHours + mappedMinutes + `${seconds}s`;
    } else {
      return '';
    }
  }

  static formatTimeFromSeconds(secondsInput: number): string {
    if (secondsInput) {
      const hours = Math.floor(secondsInput / 60 / 60);
      secondsInput -= hours * 60 * 60;
      const minutes = Math.floor(secondsInput / 60);
      secondsInput -= minutes * 60;
      const seconds = Math.floor(secondsInput);

      const mappedHours = secondsInput >= 360 ? `${hours}h :` : '';
      const mappedMinutes = secondsInput >= 60 ? `${minutes}m :` : '';
      return mappedHours + mappedMinutes + `${seconds}s`;
    } else {
      return '';
    }
  }
}

export default DateTimeHelper;
