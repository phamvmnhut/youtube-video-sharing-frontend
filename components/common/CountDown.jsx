import { useState, useEffect } from "react";

export default function CountDown({ countDownDate, onEndTimeAction }) {

    const [days, setDays] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    // const countDownDate = new Date("2022", "10", "14", "9");
    console.log(countDownDate);

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime() > 0 ? countDownDate - new Date().getTime() : 0
    );

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDownDate - new Date().getTime() > 0) {
                setCountDown(countDownDate - new Date().getTime());
            } else {
                clearInterval(interval);
                if (onEndTimeAction) {
                    onEndTimeAction();
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate, onEndTimeAction]);

    useEffect(() => {
        let [day, hour, minute, second] = getReturnValues(countDown);
        setDays(day);
        setHour(hour);
        setMinute(minute);
        setSecond(second);
    }, [countDown]);


    return (
        <>{days}: {hour} : {minute} : {second}</>
    );
}