import { useState } from "react";
import TodayNotDone from "../components/TodayNotDone";

const ActivityPage = () => {
    const [todayDone, setTodayDone] = useState(true);

    if (!todayDone) {
        return <TodayNotDone onDone={() => setTodayDone(true)} />
    }
    return (
        <div>
            <div>todays done</div>
            <div>Last Year | Last Month | Last Week/Day? | Yesterday | Today | Tomorrow</div>


            <div>So [name], what's today been like for you?</div>


            <div>..Options...</div>
        </div>
    )
}

export default ActivityPage;
