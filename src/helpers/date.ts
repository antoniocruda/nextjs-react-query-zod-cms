/**
 * Calculates time difference from now to given date
 * and returns a human readable string.
 * 
 * @param   date   The date to check
 * 
 * @return  Human readable string.
 */
export function timeFromNow(date: Date) {
    const now = new Date();
    const secondsAgo = Math.round((now.getTime() - date.getTime()) / 1000);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (secondsAgo < minute) {
        return `${secondsAgo} seconds ago`;
    }
    else if (secondsAgo < (minute * 2)) {
        return 'a minute ago'
    }
    else if (secondsAgo < hour) {
        return `${Math.floor(secondsAgo / minute)} minutes ago`;
    }
    else if (Math.floor(secondsAgo / hour) == 1) {
        return 'an hour ago'
    }
    else if (secondsAgo < day) {
        return `${Math.floor(secondsAgo / hour)} hours ago`;
    }
    else if (secondsAgo < (day * 2)) {
        return 'a day ago';
    }
    else if (secondsAgo < week) {
        return `${Math.floor(secondsAgo / day)} days ago`;
    }
    else if (secondsAgo < (week * 2)) {
        return 'a week ago';
    }
    else if (secondsAgo < month) {
        return `${Math.floor(secondsAgo / week)} weeks ago`;
    }
    else if (secondsAgo < (month * 2)) {
        return 'a month ago';
    }
    else if (secondsAgo < year) {
        return `${Math.floor(secondsAgo / month)} months ago`;
    }
    else if (secondsAgo < year * 2) {
        return 'a year ago';
    }
    else {
        return `${Math.floor(secondsAgo / year)} years ago`;
    }
}

/**
 * Calculates the difference in years of the two dates.
 * 
 * @return string
 */
export function dateDiffInYears(date1: Date, date2: Date) {
    const date1Time = date1.getTime();
    const date2Time = date2.getTime();
    const diff = (date1Time > date2Time) ? date1Time - date2Time : date2Time - date1Time;

    return Math.round(diff / 31536000000); // divide by 1 year in milliseconds
}

export function formatDateTime(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function formatDateShortMonth(date: Date) {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export function formatDateStyle(date: Date, dateStyle: 'full' | 'long' | 'medium' | 'short' = 'long') {
    const options: Intl.DateTimeFormatOptions = {
        dateStyle
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

/**
 * Formats the given date object to YYYY-MM-DD
 */
export function formatDateToYYYYMMDD(date: Date): string {
    const offset = date.getTimezoneOffset();
    const newDate = new Date(date.getTime() - (offset*60*1000));

    return newDate.toISOString().split('T')[0];
}

/**
 * Date for legal age
 */
export function legalAgeDate() {
    const now = new Date();
    const newDate = new Date(now.setFullYear(now.getFullYear() - 18));
    const formattedDate = formatDateToYYYYMMDD(newDate);

    return formattedDate;
}