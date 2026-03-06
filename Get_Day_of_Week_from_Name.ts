import assert from "assert";
/**
 * 
 * 
 * 12. Get Day of Week from Name
Write a function that will return the day of the week (0 for Sunday, 1 for Monday, etc.) given a short string representation of the day's name. The day's name will be a 3-character long, case-insensitive string (e.g., 'mon', 'MON', or 'Mon' all mean Monday). If an unknown string is passed, the function should return -1.
function getDayOfWeek(dayName)
Examples:
getDayOfWeek('sun') // should return 0
getDayOfWeek('Mon') // should return 1
getDayOfWeek('fri') // should return 5
getDayOfWeek('xyz') // should return -1

 * 
 * @param dayName string represent day
 * @returns number represent week day
 */
function getDayOfWeek(dayName: string): number {
  const Day = dayName.toLowerCase();

  switch (Day) {
    case "sun":
      return 0;
    case "mon":
      return 1;
    case "tue":
      return 2;
    case "wed":
      return 3;
    case "thu":
      return 4;
    case "fri":
      return 5;
    case "sat":
      return 6;
    default:
      return -1;
  }
}

assert(getDayOfWeek("sun") === 0, "Failed to return 0");
assert(getDayOfWeek("MON") === 1, "Failed to return 1");
assert(getDayOfWeek("fRi") === 5, "Failed to return 5");
assert(getDayOfWeek("xya") === -1, "Failed to pass -1");
assert(getDayOfWeek("xywgygyusa") === -1, "Failed to pass -1");
