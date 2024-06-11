import { useEffect, useState } from 'react';

export type DateType = {
    value: number;
    name: string | number;
    selected: boolean;
    disabled: boolean;
}

export type CalendarType = {
    [key: number]: DateType;
}

type Props = {
    date: Date,
    currentYear: number,
    currentMonth: number,
    currentDay: number,
    onChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
};

export default function CalendarPage({
    date,
    currentYear,
    currentMonth,
    currentDay,
    onChange,
    minDate,
    maxDate
}: Props) {

    const [calendar, setCalendar] = useState<CalendarType[]>([]);

    const daysInMonth = (iMonth: number, iYear: number) => {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }
    
    useEffect(() => {
        let cnt = 1;
        let columns: CalendarType[] = [];
        for (let i: number = 0; i < 6; i++) {
            const rows: DateType[] = [];
    
            for (let j: number = 0; j < 7; j++) {
                if (i === 0 && j < currentDay) {
                    rows.push({
                        value: 0,
                        name: '',
                        selected: false,
                        disabled: false
                    });
                }
                else if (cnt > daysInMonth(currentMonth, currentYear)) {
                    break;
                }
                else {
                    if (cnt === date.getDate() && currentYear === date.getFullYear() && currentMonth === date.getMonth()) {
                        rows.push({
                            value: cnt,
                            name: cnt,
                            selected: true,
                            disabled: false
                        });
                    }
                    else {
                        let disabled = false;
                        if (maxDate && minDate) {
                            const currentDate = new Date(currentYear, currentMonth, cnt);
                            disabled = maxDate < currentDate || minDate > currentDate;
                        }
                        else if (maxDate) {
                            const currentDate = new Date(currentYear, currentMonth, cnt);
                            disabled = maxDate < currentDate;
                        }
                        else if (minDate) {
                            const currentDate = new Date(currentYear, currentMonth, cnt);
                            disabled = minDate > currentDate;
                        }
                        
                        rows.push({
                            value: cnt,
                            name: cnt,
                            selected: false,
                            disabled
                        });
                    }
                    cnt++;
                }
            }
            columns.push(rows);
        }
        setCalendar(columns);
    }, [date, currentYear, currentMonth, currentDay, maxDate, minDate]);

    const handleOnChange = onChange || (() => {});

    return (
        <>
            <div className="h-[304px]">
                <table className='w-full px-3'>
                    <thead>
                        <tr>
                            <th className='w-[40px] h-[40px] text-center text-sm'>S</th>
                            <th className='w-[40px] h-[40px] text-center text-sm'>M</th>
                            <th className='w-[40px] h-[40px] text-center text-sm'>T</th>
                            <th className='w-[40px] h-[40px] text-center text-sm'>W</th>
                            <th className='w-[40px] h-[40px] text-center text-sm'>T</th>
                            <th className='w-[40px] h-[40px] text-center text-sm'>F</th>
                            <th className='w-[40px] h-[40px] text-center text-sm'>S</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calendar.map((rows: any, rowKey: number) => {
                            return (
                                <tr key={`row_${rowKey}`}>
                                    {rows.map((columns: DateType, columnKey: number) => {
                                        if (columns.name === '') {
                                            return <td key={`column_${rowKey}_${columnKey}`}><div className='w-[40px] h-[40px]'>&nbsp;</div></td>;
                                        }
                                        return (
                                            <td
                                                key={`column_${rowKey}_${columnKey}`}
                                                className='
                                                w-[40px] h-[40px] text-sm text-center align-middle
                                                text-[#666]
                                            '>
                                                <div
                                                    className={`
                                                        text-center w-[40px] h-[40px] flex justify-center items-center
                                                        ${columns.selected && ' bg-[#eee] rounded-full'}
                                                        ${columns.disabled ? ' text-gray-200' : ' hover:bg-red-100 hover:rounded-full hover:text-white cursor-pointer'}
                                                    `}
                                                    onClick={() => !columns.disabled && handleOnChange(new Date(currentYear, currentMonth, columns.value))}
                                                >
                                                    {columns.name}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
