export class MyConstants {
  //form validations
  static readonly minPassLength = 4;
  static readonly maxPassLength = 16;
  static readonly minIdLength = 6;
  static readonly maxIdLength = 16;
  static readonly minPhoneLength = 8;
  static readonly maxPhoneLength = 11;
  //
}

export function ConvertDateToIranPersian(date: string): string {
  const d = new Date(date);
  const tehranTime = d.toLocaleString("fa-fa", { timeZone: "Europe/London" });
  return tehranTime;
}

export function PersianDateToUTC(
  year: number,
  month: number,
  day: number,
  hour: number
): number {
  let yearD,
    monthD,
    dayD = 0;
  console.log("start with: ", year, month, day, hour);
  //start date in persian: 1348/10/11
  if (month > 10) {
    if (day >= 11) {
      yearD = year - 1348;
      monthD = month - 10;
      dayD = day - 11;
    } else {
      yearD = year - 1348;
      monthD = month - 10 - 1;
      dayD = 30 - (11 - day);
    }
  } else if (month < 10) {
    if (day >= 11) {
      yearD = year - 1348 - 1;
      monthD = 12 - (10 - month);
      dayD = day - 11;
    } else {
      yearD = year - 1348 - 1;
      monthD = 12 - (10 - month);
      dayD = 30 - (11 - day);
    }
  } else {
    if (day >= 11) {
      yearD = year - 1348;
      monthD = 0;
      dayD = day - 11;
    } else {
      yearD = year - 1348 - 1;
      monthD = 11;
      dayD = 30 - (11 - day);
    }
  }
  let monthD2day = 0;
  if (monthD < 3) monthD2day = monthD * 30;
  else if (monthD < 9) monthD2day = 60 + 29 + (monthD - 3) * 31;
  else monthD2day = 60 + 29 + 6 * 31 + (monthD - 9) * 31;
  console.log("ends with: ", yearD, monthD2day, dayD, Math.floor(yearD / 4));
  return (
    ((yearD * 365 + monthD2day + dayD + Math.floor(yearD / 4)) * 24 +
      hour) *
    60 *
    60 *
    1000
  );
}

export function DateSeperator(date: string): string[] {
  var separators = [' ', '\\\+', '،', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
  var tokens = date.split(new RegExp(separators.join('|'), 'g'));
  return tokens;
}

export function ParseIntFromPersian(str: string): number {
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  for(let i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i.toString());
    }
  return parseInt(str);
}
