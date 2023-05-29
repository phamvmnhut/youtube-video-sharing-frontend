import {
    format,
    subMonths,
    addMonths,
    subYears,
    addYears,
    isEqual,
    getDaysInMonth,
    getDay
} from "date-fns";

import { useState, useEffect } from "react";

export default function DatePicker({
    title
}) {
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [dayCount, setDayCount] = useState([]);
    const [blankDays, setBlankDays] = useState([]);
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [type, setType] = useState("date");

    const decrement = () => {
        switch (type) {
            case "date":
                setDatepickerHeaderDate((prev) => subMonths(prev, 1));
                break;
            case "month":
                setDatepickerHeaderDate((prev) => subYears(prev, 1));
                break;
            case "year":
                setDatepickerHeaderDate((prev) => subMonths(prev, 1));
                break;
        }
    };

    const increment = () => {
        switch (type) {
            case "date":
                setDatepickerHeaderDate((prev) => addMonths(prev, 1));
                break;
            case "month":
                setDatepickerHeaderDate((prev) => addYears(prev, 1));
                break;
            case "year":
                setDatepickerHeaderDate((prev) => subMonths(prev, 1));
                break;
        }
    };

    const isToday = (date) =>
        isEqual(
            new Date(datepickerHeaderDate.getFullYear(), datepickerHeaderDate.getMonth(), date, datepickerHeaderDate.getHours(), datepickerHeaderDate.getMinutes()),
            datepickerHeaderDate
        );

    const setDateValue = (date) => () => {
        setDatepickerHeaderDate(
            new Date(
                datepickerHeaderDate.getFullYear(),
                datepickerHeaderDate.getMonth(),
                date,
                datepickerHeaderDate.getHours(),
                datepickerHeaderDate.getMinutes(),
            )
        );
    };

    const setHourValue = (hour) => {
        setDatepickerHeaderDate(
            (prev) => new Date(
                prev.getFullYear(),
                prev.getMonth(),
                prev.getDate(),
                hour,
                prev.getMinutes(),
            )
        );
    };

    const setMinuteValue = (minute) => {
        setDatepickerHeaderDate(
            (prev) => new Date(
                prev.getFullYear(),
                prev.getMonth(),
                prev.getDate(),
                prev.getHours(),
                minute,
            )
        );
    };

    const getDayCount = (date) => {
        let daysInMonth = getDaysInMonth(date);

        // find where to start calendar day of week
        let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
        let blankdaysArray = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }

        let daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setBlankDays(blankdaysArray);
        setDayCount(daysArray);
    };

    const isSelectedMonth = (month) =>
        isEqual(
            new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
            selectedDate
        );

    const setMonthValue = (month) => () => {
        setDatepickerHeaderDate(
            new Date(
                datepickerHeaderDate.getFullYear(),
                month,
                datepickerHeaderDate.getDate()
            )
        );
        setType("date");
    };

    function setDateTimeDone() {
        setSelectedDate(datepickerHeaderDate);
        setShowDatepicker((prev) => !prev)
    }

    const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

    const showMonthPicker = () => setType("month");

    const showYearPicker = () => setType("date");

    useEffect(() => {
        getDayCount(datepickerHeaderDate);
    }, [datepickerHeaderDate]);

    return (
        <div className="mb-5 w-64">
            <label
                htmlFor="datepicker"
                className="font-bold mb-1 text-white block"
            >
                {title}
            </label>
            <div className="relative border rounded-md border-white text-white">
                <input type="hidden" name="date" />
                <input
                    type="text"
                    readOnly
                    className="cursor-pointer bg-transparent w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-white font-medium"
                    placeholder="Select date"
                    value={format(selectedDate, "yyyy-MM-dd HH:mm")}
                    onClick={toggleDatepicker}
                />
                <div
                    className="cursor-pointer absolute top-0 right-0 px-3 py-2 text-white"
                    onClick={toggleDatepicker}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                </div>
                {showDatepicker && (
                    <div
                        className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 w-[17rem]"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <button
                                    type="button"
                                    className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                    onClick={decrement}
                                >
                                    <svg
                                        className="h-6 w-6 text-gray-500 inline-flex"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {type === "date" && (
                                <div
                                    onClick={showMonthPicker}
                                    className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
                                >
                                    <p className="text-center">
                                        {format(datepickerHeaderDate, "MMMM")}
                                    </p>
                                </div>
                            )}
                            <div
                                onClick={showYearPicker}
                                className="flex-grow p-1 text-lg font-bold text-gray-800 rounded-lg"
                            >
                                <p className="text-center">
                                    {format(datepickerHeaderDate, "yyyy")}
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                    onClick={increment}
                                >
                                    <svg
                                        className="h-6 w-6 text-gray-500 inline-flex"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {type === "date" && (
                            <>
                                <div className="flex flex-wrap mb-3 -mx-1">
                                    {DAYS.map((day, i) => (
                                        <div
                                            key={i}
                                            style={{ width: "14.26%" }}
                                            className="px-1"
                                        >
                                            <div className="text-gray-800 font-medium text-center text-xs">
                                                {day}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap -mx-1">
                                    {blankDays.map((_, i) => (
                                        <div
                                            key={i}
                                            style={{ width: "14.26%" }}
                                            className="text-center border p-1 border-transparent text-sm"
                                        ></div>
                                    ))}
                                    {dayCount.map((d, i) => (
                                        <div
                                            key={i}
                                            style={{ width: "14.26%" }}
                                            className="px-1 mb-1"
                                        >
                                            <div
                                                onClick={setDateValue(d)}
                                                className={`cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100 ${isToday(d)
                                                    ? "bg-blue-500 text-white"
                                                    : "text-gray-700 hover:bg-blue-200"
                                                    }`}
                                            >
                                                {d}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-row items-center gap-5 text-black py-2 justify-between">
                                    <div className="flex flex-row border border-black  rounded-md pl-2 pr-2 py-2 justify-start">
                                        <input className="bg-transparent w-6 text-black focus:outline-offset-1 text-center" 
                                        value={datepickerHeaderDate.getHours()} 
                                        onChange={(e) => setHourValue(e.target.value)}></input>
                                        <span className="font-bold">H :</span>
                                        <input className="ml-2 bg-transparent w-6 focus:outline-offset-1 text-center text-black" 
                                        value={datepickerHeaderDate.getMinutes()}
                                        onChange={(e) => setMinuteValue(e.target.value)}
                                        ></input>
                                        <span className="font-bold">M</span>
                                    </div>
                                    <button className="px-2 py-1 bg-background2 text-white rounded-lg font-bold shadow-lg" onClick={setDateTimeDone}>OK</button>
                                </div>
                            </>
                        )}
                        {type === "month" && (
                            <div className="flex flex-wrap -mx-1">
                                {Array(12)
                                    .fill(null)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            onClick={setMonthValue(i)}
                                            style={{ width: "25%" }}
                                        >
                                            <div
                                                className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${isSelectedMonth(i)
                                                    ? "bg-blue-500 text-white"
                                                    : "text-gray-700 hover:bg-blue-200"
                                                    }`}
                                            >
                                                {format(
                                                    new Date(
                                                        datepickerHeaderDate.getFullYear(),
                                                        i,
                                                        datepickerHeaderDate.getDate()
                                                    ),
                                                    "MMM"
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}