import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSystemStatus } from "../../Redux/features/systemStatusSlice";

import "./systemStatus.css";

const SystemStatus = () => {
  const dispatch = useDispatch();
  const { currentPower, energyToday, energyLifetime, lastReportAt } =
    useSelector((state) => state.systemStatus);

  useEffect(() => {
    dispatch(fetchSystemStatus());
    const intervalId = setInterval(() => {
      dispatch(fetchSystemStatus());
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div id="system-container">
      <div className="system-card">
        <p>Current Output:</p>
        <div>{currentPower} W</div>
      </div>
      <div className="system-card">
        <p>
          Total Output - {new Date(lastReportAt * 1000).toLocaleDateString()}:
        </p>
        <div>{energyToday} W</div>
      </div>
      <div className="system-card">
        <p>Total Output - Lifetime:</p>
        <div>{(energyLifetime / 1_000_000).toFixed()} Mw</div>
      </div>
    </div>
  );
};

export default SystemStatus;
