import { YearView } from "./YearView";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { YesterdayView } from "./YesterdayView";
import { TodayView } from "./TodayView";
import { TomorrowView } from "./TomorrowView";

export type ViewType = "year" | "month" | "week" | "yesterday" | "today" | "tomorrow";

export const VIEWS = {
    year: YearView,
    month: MonthView,
    week: WeekView,
    yesterday: YesterdayView,
    today: TodayView,
    tomorrow: TomorrowView
}
