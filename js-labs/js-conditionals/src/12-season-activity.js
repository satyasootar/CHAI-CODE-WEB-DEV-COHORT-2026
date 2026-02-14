/**
 * 🗺️ WanderLust Travel Planner
 *
 * WanderLust is a travel planning app that suggests fun activities
 * based on the month and the current temperature. Users enter the
 * month number and temperature, and the app recommends what to do!
 *
 * Step 1 — Determine the season from the month:
 *   - December, January, February  (12, 1, 2)   → "Winter"
 *   - March, April, May            (3, 4, 5)     → "Spring"
 *   - June, July, August           (6, 7, 8)     → "Summer"
 *   - September, October, November (9, 10, 11)   → "Autumn"
 *
 * Step 2 — Suggest an activity based on season AND temperature (°C):
 *   - Winter + temp < 0     → "skiing"
 *   - Winter + temp >= 0    → "ice skating"
 *   - Spring + temp > 20    → "hiking"
 *   - Spring + temp <= 20   → "museum visit"
 *   - Summer + temp > 35    → "swimming"
 *   - Summer + temp <= 35   → "cycling"
 *   - Autumn + temp > 15    → "nature walk"
 *   - Autumn + temp <= 15   → "reading at a cafe"
 *
 * Return an object: { season: string, activity: string }
 *
 * Rules:
 *   - If month is not 1–12, return null
 *
 * @param {number} month - Month of the year (1-12)
 * @param {number} temperature - Current temperature in Celsius
 * @returns {{ season: string, activity: string } | null}
 */
export function getSeasonActivity(month, temperature) {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }


  function getSeason(month) {
    if ([12, 1, 2].includes(month)) {
      return "Winter"
    }
    if ([3, 4, 5].includes(month)) {
      return "Spring"
    }
    if ([6, 7, 8].includes(month)) {
      return "Summer"
    }
    if ([9, 10, 11].includes(month)) {
      return "Autumn"
    }
  }

  function getActivity(season, temp) {
    if(season === "Winter"){
        return temp < 0 ? "skiing": "ice skating" 
    }

    if(season === "Spring"){
        return temp > 20? "hiking": "museum visit"
    }

    if(season == "Summer"){
        return temp > 35? "swimming" : "cycling"
    }

    if(season == "Autumn"){
        return temp > 15? "nature walk" : "reading at a cafe"
    }
  }

    let season = getSeason(month)
    let activity = getActivity(season, temperature)
    
  return {season, activity}
}
