import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSystemStatus } from "../../Redux/features/systemStatusSlice";

const SystemStatus = () => {
  const dispatch = useDispatch();
  const {
    systemId,
    modules,
    sizeW,
    currentPower,
    energyToday,
    energyLifetime,
    summaryDate,
    source,
    status,
    operationalAt,
    lastReportAt,
    lastIntervalEndAt,
    loading,
    error,
  } = useSelector((state) => state.systemStatus);

  useEffect(() => {
    dispatch(fetchSystemStatus());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchSystemStatus());
  };

  return (
    <div>
      <h1>System Status:</h1>
      <button onClick={handleRefresh}>Update Status</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}...</div>}
      <ul>
        <li>
          <strong>System ID:</strong> {systemId}
        </li>
        <li>
          <strong>Modules:</strong> {modules}
        </li>
        <li>
          <strong>Size (W):</strong> {sizeW}
        </li>
        <li>
          <strong>Current Power:</strong> {currentPower}
        </li>
        <li>
          <strong>Energy Today:</strong> {energyToday}
        </li>
        <li>
          <strong>Energy Lifetime:</strong> {energyLifetime}
        </li>
        <li>
          <strong>Summary Date:</strong> {summaryDate}
        </li>
        <li>
          <strong>Source:</strong> {source}
        </li>
        <li>
          <strong>Status:</strong> {status}
        </li>
        <li>
          <strong>Operational At:</strong>{" "}
          {new Date(operationalAt * 1000).toLocaleString()}
        </li>
        <li>
          <strong>Last Report At:</strong>{" "}
          {new Date(lastReportAt * 1000).toLocaleString()}
        </li>
        <li>
          <strong>Last Interval End At:</strong>{" "}
          {new Date(lastIntervalEndAt * 1000).toLocaleString()}
        </li>
      </ul>
    </div>
  );
};

export default SystemStatus;
