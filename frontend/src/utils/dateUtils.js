// -----------------------------------------
// Message bubble date (Today / Yesterday / DD MMM YYYY)
// -----------------------------------------

import moment from "moment";

export const formatMessageDate = (date) => {
const now = moment();
const target = moment(date);


if (target.isSame(now, "day")) return "Today";
if (target.isSame(now.clone().subtract(1, "day"), "day")) return "Yesterday";


return target.format("DD MMM YYYY");
};

export function getChatHeaderDate() {
    const now = new Date();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (now.toDateString() === today.toDateString()) {
        return "Today";
    }

    if (now.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    return now.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
