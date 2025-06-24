import React, { useState, useEffect } from "react";
import { pingServer } from "../utils/api";
import "./styles/pingStatus.css";


const PingStatus: React.FC = () => {
    const [ping, setPing] = useState<number | null>(null);
    const [status, setStatus] = useState<"good" | "average" | "bad" | "fail">(
        "fail"
    );

    const fetchPing = async () => {
        const latency = await pingServer();
        if (latency === null) {
            setPing(null);
            setStatus("fail");
            return;
        }

        setPing(latency);
        if (latency < 100) setStatus("good");
        else if (latency < 300) setStatus("average");
        else setStatus("bad");
    };

    useEffect(() => {
        fetchPing();
        const interval = setInterval(fetchPing, 10000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className={`pingStatusContainer pingStatus ${status}`}>
            {ping !== null ? `${ping} ms` : "No response"}
        </div>
    );
};

export default PingStatus;
