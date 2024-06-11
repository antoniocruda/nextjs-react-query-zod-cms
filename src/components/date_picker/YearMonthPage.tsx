import { useEffect, useState } from "react";

export type DateType = {
    value: number;
    name: string | number;
    selected: boolean;
    disabled: boolean;
}

export type CalendarType = {
    [key: number]: DateType;
}

interface Props {
    months: string[];
    currentYear: number;
    currentMonth: number;
    yearInterval: number;
    onSelectedYear: (year: number) => void;
    onClose: (year: number, month: number) => void;
    isYear: (yes: boolean) => void;
    minDate?: Date;
    maxDate?: Date;
    year: number;
};

const YearMonthPage = ({
    months,
    currentYear,
    currentMonth,
    yearInterval,
    onSelectedYear,
    onClose,
    isYear,
    minDate,
    maxDate,
    year
}: Props) => {

    const [calendar, setCalendar] = useState<CalendarType[]>([]);
    const [isMonth, setIsMonth] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    
    useEffect(() => {
        const columns: CalendarType[] = [];
        if (!isMonth) {
            isYear(true);
            let cnt = yearInterval === 0 ? currentYear - 10 : currentYear + yearInterval;

            for (let i: number = 0; i < 6; i++) {
                const rows: DateType[] = [];
        
                for (let j: number = 0; j < 4; j++) {
                    if (cnt === currentYear) {
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
                            disabled = maxDate.getFullYear() < cnt || minDate.getFullYear() > cnt;
                        }
                        else if (maxDate) {
                            disabled = maxDate.getFullYear() < cnt;
                        }
                        else if (minDate) {
                            disabled = minDate.getFullYear() > cnt;
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
                columns.push(rows);
            }
        }
        else {
            isYear(false);
            let cnt = 0;
            for (let i: number = 0; i < 6; i++) {
                const rows: DateType[] = [];
        
                for (let j: number = 0; j < 4; j++) {
                    if (currentMonth === cnt && currentYear === selectedYear) {
                        rows.push({
                            value: cnt,
                            name: months[cnt] || '',
                            selected: true,
                            disabled: false
                        });
                    }
                    else {
                        let disabled = false;
                        if (maxDate && minDate) {
                            disabled = ((maxDate.getFullYear() == selectedYear && maxDate.getMonth() < cnt) || maxDate.getFullYear() < selectedYear) 
                            || ((minDate.getFullYear() >= selectedYear && minDate.getMonth() > cnt) || minDate.getFullYear() > selectedYear);
                        }
                        else if (maxDate) {
                            disabled = (maxDate.getFullYear() == selectedYear && maxDate.getMonth() < cnt) || maxDate.getFullYear() < selectedYear;
                        }
                        else if (minDate) {
                            disabled = (minDate.getFullYear() >= selectedYear && minDate.getMonth() > cnt) || minDate.getFullYear() > selectedYear;
                        }
                        
                        rows.push({
                            value: cnt,
                            name: months[cnt] || '',
                            selected: false,
                            disabled
                        });
                    }
                    cnt++;
                }
                columns.push(rows);
            }
        }
        setCalendar(columns);
    }, [currentMonth, currentYear, yearInterval, isMonth, minDate, maxDate, selectedYear]);

    useEffect(() => {
        if (year) {
            setSelectedYear(year);
            onSelectedYear(year);
        }
    }, [year]);

    const handleOnSelectedYear = (year: number) => {
        setIsMonth(true);
        setSelectedYear(year);
        onSelectedYear(year);
    };

    const handleOnSelectedMonth = (month: number) => {
        handleOnClose(selectedYear, month);
    };

    const handleOnClose = onClose || (() => {});

    return (
        <>
            <div className="h-[304px]">
                <table className='w-full px-3 select-none'>
                    <tbody>
                        {calendar.map((rows: any, rowKey: number) => {
                            return (
                                <tr key={`row_${rowKey}`}>
                                    {rows.map((columns: DateType, columnKey: number) => {
                                        if (!isMonth) {
                                            return (
                                                <td
                                                    key={`column_${rowKey}_${columnKey}`}
                                                    className='
                                                        text-sm text-center align-middle text-[#666]
                                                    '
                                                    onClick={() => !columns.disabled && handleOnSelectedYear(columns.value)}
                                                >
                                                    <div className={`
                                                        text-center w-[72px] h-[40px] flex justify-center items-center
                                                        ${columns.selected && ' bg-[#eee] rounded-full'}
                                                        ${columns.disabled ? ' text-gray-200' : ' hover:bg-red-100 hover:rounded-full hover:text-white cursor-pointer'}
                                                    `}>{columns.name}</div>
                                                </td>
                                            );
                                        } 
                                        if (isMonth && columns.name !== '') {
                                            return (
                                                <td
                                                    key={`column_${rowKey}_${columnKey}`}
                                                    className='
                                                        text-sm text-center align-middle text-[#666]
                                                    '
                                                    onClick={() => !columns.disabled && handleOnSelectedMonth(columns.value)}
                                                >
                                                    <div className={`
                                                        text-center w-[72px] h-[40px] flex justify-center items-center
                                                        ${columns.selected && ' bg-[#eee] rounded-full'}
                                                        ${columns.disabled ? ' text-gray-200' : ' hover:bg-red-100 hover:rounded-full hover:text-white cursor-pointer'}
                                                    `}>{columns.name}</div>
                                                </td>
                                            );
                                        }
                                        return (
                                            <td
                                                key={`column_${rowKey}_${columnKey}`}
                                                className='text-sm text-center align-middle text-[#666]'
                                            >
                                                <div className='w-[72px] h-[40px]'></div>
                                            </td>
                                        )
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

export default YearMonthPage;