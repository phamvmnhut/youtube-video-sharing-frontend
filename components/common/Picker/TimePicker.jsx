import { useState, useEffect } from "react";

export default function TimePicker({ title }) {
    const [showDatepicker, setShowDatepicker] = useState(false);

    const [selectedTime, setSelectedTime] = useState({
        hour: (new Date()).getHours() % 12,
        minute: (new Date()).getMinutes(),
        isSun: (new Date()).getHours() / 12 == 0,
    });

    function formatTime(data) {
        return `${data.hour} : ${data.minute}  ${data.isSun ? "AM" : "PM"}`;
    }

    const decrement = (type) => {
        switch (type) {
            case "hour":
                setSelectedTime((prev) => {
                    return {
                        ...prev,
                        hour: prev.hour - 1 < 0 ? 11 : prev.hour - 1
                    }
                });
                break;
            case "minute":
                setSelectedTime((prev) => {
                    return {
                        ...prev,
                        minute: prev.minute - 1 < 0 ? 59 : prev.minute - 1
                    }
                });
                break;
        }
    };

    const increment = (type) => {
        switch (type) {
            case "hour":
                setSelectedTime((prev) => {
                    return {
                        ...prev,
                        hour: prev.hour + 1 > 11 ? 0 : prev.hour + 1
                    }
                });
                break;
            case "minute":
                setSelectedTime((prev) => {
                    return {
                        ...prev,
                        minute: prev.minute + 1 > 59 ? 0 : prev.minute + 1
                    }
                });
                break;
        }
    };

    function setTypeTimeIsSun(isSun) {
        setSelectedTime((prev) => {
            return {
                ...prev,
                isSun,
            }
        });
    }

    const toggleTimepicker = () => setShowDatepicker((prev) => !prev);

    function resetTime() {
        setSelectedTime({
            hour: 0,
            minute: 0,
            isSun: true,
        })
    }

    return (
        <div className="mb-5 ">
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
                    value={formatTime(selectedTime)}
                    onClick={toggleTimepicker}
                />
                <div
                    className="cursor-pointer absolute top-0 right-0 px-3 py-2 text-white"
                    onClick={toggleTimepicker}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                {showDatepicker && (
                    <div
                        className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 w-[17rem] grid grid-cols-3 scroll-smooth overflow-scroll scrollbar-hide text-black"
                    >
                        <div className="flex flex-col -mx-1 overflow-scroll scrollbar-hide text-center items-center">
                            <button className="px-5 py-2 hover:bg-blue-400 rounded-md" onClick={() => increment("hour")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <div className="font-bold text-xl">{selectedTime.hour}</div>
                            <button className="px-5 py-2 hover:bg-blue-400 rounded-md" onClick={() => decrement("hour")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col -mx-1 overflow-scroll scrollbar-hide items-center">
                            <button className="px-5 py-2 hover:bg-blue-400 rounded-md" onClick={() => increment("minute")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <div className="font-bold text-xl">{selectedTime.minute}</div>
                            <button className="px-5 py-2 hover:bg-blue-400 rounded-md" onClick={() => decrement("minute")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 overflow-scroll scrollbar-hide">
                            <button className={`px-5 py-2 hover:bg-blue-300 rounded-md font-bold ${selectedTime.isSun ? "bg-blue-400" : ""}`} onClick={() => setTypeTimeIsSun(true)}>
                                AM
                            </button>
                            <button className={`px-5 py-2 hover:bg-blue-300 rounded-md font-bold ${!selectedTime.isSun ? "bg-blue-400" : ""}`} onClick={() => setTypeTimeIsSun(false)}>
                                PM
                            </button>
                            <button className="mt-5 px-5 py-2 bg-background2 text-white rounded-md font-bold"
                                onClick={resetTime}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}