
import useClickoutside from '@/hooks/useClickoutside';
import { CSSProperties, useEffect, useState } from 'react';
import CalendarPage from './CalendarPage';
import YearMonthPage from './YearMonthPage';
import AngleDownSolidIcon from '@/icons/AngleDownSolidIcon';

type Props = {
    date: Date,
    onChange: (date: Date) => void;
    onCancel: (cancel: boolean) => void;
    style?: CSSProperties;
    title?: string;
    className?: string;
    minDate?: Date;
    maxDate?: Date;
};

const DatePicker = ({
    date,
    onChange,
    onCancel,
    style,
    title,
    className,
    minDate,
    maxDate
}: Props) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [dateNow, setDateNow] = useState<Date>(date);
    const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
    const [currentDay, setCurrentDay] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [yearInterval, setYearInterval] = useState<number>(0);
    const [isShowCalendar, setIsShowCalendar] = useState<boolean>(true);
    const [isShowYearMonth, setIsShowYearMonth] = useState<boolean>(false);
    const [currentClassName, setCurrentClassName] = useState<string>('');
    const [isYear, setIsYear] = useState<boolean>(true);

    const clickRef = useClickoutside(() => {
        onCancel(true);
    });

    useEffect(() => {
        setCurrentDay((new Date(currentYear, currentMonth)).getDay());
    }, [currentYear, currentMonth]);

    useEffect(() => {
        let preClassName = ''

        if (className) {
            const cnArr1 = className.split(' ');
            const cnArr2 = preClassName.split(' ');

            preClassName = mergeArrays(cnArr1, cnArr2).join(' ');
        }

        setCurrentClassName(preClassName);
    }, [className]);

    const mergeArrays = (arr1: string[], arr2: string[]):string[] => {
        let newArr = arr1.concat(arr2);

        newArr = newArr.filter((item, idx)=>{
            return (newArr.indexOf(item) == idx)
        })

        return newArr;
    };

    const handleOnChangeDate = () => {
        setIsShowCalendar(!isShowCalendar);
        setIsShowYearMonth(!isShowYearMonth);
        setYearInterval(0);
    }

    const handleOnNext = () => {
        if (isShowYearMonth) {
            if (!isYear) {
                setSelectedYear(selectedYear + 1);
            }
            else if (yearInterval === 0) {
                setYearInterval(yearInterval + 14);
            }
            else {
                setYearInterval(yearInterval + 24);
            }
        }

        if (isShowCalendar) {
            setCurrentYear((currentMonth === 11) ? currentYear + 1 : currentYear);
            setCurrentMonth((currentMonth + 1) % 12);
        }
    }
    
    const handleOnPrevious = () => {
        if (isShowYearMonth) {
            if (!isYear) {
                setSelectedYear(selectedYear - 1);
            }
            else if (yearInterval === 0) {
                setYearInterval(yearInterval - 34);
            }
            else {
                setYearInterval(yearInterval - 24);
            }
        }
        
        if (isShowCalendar) {
            setCurrentYear((currentMonth === 0) ? currentYear - 1 : currentYear);
            setCurrentMonth((currentMonth === 0) ? 11 : currentMonth - 1);
        }
    }

    const handleOnToday = () => {
        const today = new Date();
        setDateNow(today);
        setCurrentYear(today.getFullYear());
        setCurrentMonth(today.getMonth());
    }

    const handleOnClear = () => {
        setDateNow(date);
        setCurrentYear(date.getFullYear());
        setCurrentMonth(date.getMonth());
    }

    return (
        <>
            <div
                ref={clickRef}
                className={`absolute z-10 ${currentClassName}`}
                style={{...style}}
            >
                <div className='w-[328px] shadow-lg rounded-lg select-none bg-white'>
                    <div className='header p-4 px-6 bg-red-100 rounded-t-lg'>
                        <div className='text-sm tracking-widest text-white'>{title ? title : 'SELECT DATE'}</div>
                    </div>
                    <div className='body px-3 pt-4'>
                        <div className='navigation text-xs flex justify-between items-center'>
                            <div className='mb-1'>
                                <button
                                    className='
                                        hover:bg-red-100 hover:text-white py-2 px-3
                                        font-bold text-red-200 rounded-2xl tracking-widest
                                        flex flex-row
                                    '
                                    onClick={handleOnChangeDate}
                                >  
                                    {(isShowCalendar) && (
                                        <span>{months[currentMonth] + ", " + currentYear}</span>
                                    )}
                                    {(isShowYearMonth && !isYear) && (
                                        <span>{selectedYear}</span>
                                    )}
                                    {(isShowYearMonth && isYear) && (
                                        <span>
                                            {(
                                                selectedYear - 10 + 
                                                (yearInterval === 0 ? 0 : (10 + yearInterval)) - 
                                                (selectedYear - currentYear)
                                            ) + " - " +
                                            (
                                                selectedYear + 13 +
                                                (yearInterval === 0 ? 0 : (10 + yearInterval)) - 
                                                (selectedYear - currentYear)
                                            )}
                                        </span>
                                    )}
                                    <AngleDownSolidIcon className='w-3 h-3 ml-2 mt-[2px]'/>
                                </button>
                            </div>
                            <div>
                                <button
                                    className='
                                        hover:bg-red-100 hover:text-white py-2 px-3
                                        font-bold text-red-200 rounded-2xl tracking-widest
                                    '
                                    onClick={handleOnPrevious}
                                >
                                    <AngleDownSolidIcon className='w-3 h-3 rotate-90'/>
                                </button>
                                <button
                                    className='
                                        hover:bg-red-100 hover:text-white py-2 px-3
                                        font-bold text-red-200 rounded-2xl tracking-widest
                                    '
                                    onClick={handleOnNext}
                                >
                                    <AngleDownSolidIcon className='w-3 h-3 rotate-[270deg]'/>
                                </button>
                            </div>
                        </div>
                        {(isShowYearMonth) && (
                            <YearMonthPage
                                months={months}
                                currentYear={currentYear}
                                currentMonth={currentMonth}
                                yearInterval={yearInterval}
                                onSelectedYear={(year) => setSelectedYear(year)}
                                onClose={(year, month) => {
                                    setIsShowCalendar(!isShowCalendar);
                                    setIsShowYearMonth(!isShowYearMonth);
                                    setCurrentYear(year);
                                    setCurrentMonth(month);
                                    setYearInterval(0);
                                }}
                                isYear={setIsYear}
                                minDate={minDate}
                                maxDate={maxDate}
                                year={selectedYear}
                            />
                        )}
                        {(isShowCalendar) && (
                            <CalendarPage
                                date={dateNow}
                                currentDay={currentDay}
                                currentYear={currentYear}
                                currentMonth={currentMonth}
                                onChange={onChange}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        )}
                    </div>
                    <div className='footer text-xs flex justify-between px-3 pb-3'>
                        <div>
                            <button
                                className={`
                                    py-2 px-3 font-bold text-red-200 rounded-2xl tracking-widest
                                    ${isShowYearMonth ? 'opacity-20' : 'hover:bg-red-100 hover:text-white'}
                                `}
                                disabled={isShowYearMonth}
                                onClick={() => handleOnToday()}
                            >
                                TODAY
                            </button>
                        </div>
                        <div>
                            <button
                                className={`
                                    py-2 px-3 font-bold text-red-200 rounded-2xl tracking-widest
                                    ${isShowYearMonth ? 'opacity-20' : 'hover:bg-red-100 hover:text-white'}
                                `}
                                disabled={isShowYearMonth}
                                onClick={() => handleOnClear()}
                            >
                                CLEAR
                            </button>
                            <button
                                className={`
                                    py-2 px-3 font-bold text-red-200 rounded-2xl tracking-widest
                                    ${isShowYearMonth ? 'opacity-20' : 'hover:bg-red-100 hover:text-white'}
                                `}
                                disabled={isShowYearMonth}
                                onClick={() => onCancel(true)}
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DatePicker;