import dayjs from 'dayjs';
import 'dayjs/locale/pl'

export function getFullDate(date: number): string {
    dayjs.locale('pl')
    return dayjs.unix(date).format("DD MMMM YYYY [r.]");
}