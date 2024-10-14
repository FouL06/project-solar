import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSystemInfo } from "../../Redux/features/systemInfoSlice";
import SystemStatus from "./systemStatus";

import "./systemInfo.css";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import OfflineBoltSharpIcon from "@mui/icons-material/OfflineBoltSharp";

const SystemInfo = () => {
  const dispatch = useDispatch();
  const systems = useSelector((state) => state.systemInfo.systems);
  const status = useSelector((state) => state.systemInfo.status);
  const error = useSelector((state) => state.systemInfo.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSystemInfo());
    }
  }, [dispatch, status]);

  return (
    <div id="account-container">
      {systems.map((system) => (
        <div id="cards-container">
          <div className="card-container">
            <AccountCircleSharpIcon
              style={{
                color: "#b8b8b8",
                width: "45px",
                height: "45px",
                margin: "0 18px",
              }}
            />
            <div className="card-info">
              <div>Name: {system.system_name}</div>
              <div>
                {system.city}, {system.state}, {system.postal_code}
              </div>
            </div>
          </div>
          <div className="card-container">
            {system.status === "normal" ? (
              <OfflineBoltSharpIcon
                style={{
                  color: "green",
                  width: "45px",
                  height: "45px",
                  margin: "0 18px",
                }}
                className="blink-green"
              />
            ) : (
              <OfflineBoltSharpIcon
                style={{
                  color: "red",
                  width: "45px",
                  height: "45px",
                  margin: "0 18px",
                }}
                className="blink-red"
              />
            )}
            <div>
              <div className="card-info">
                <div>Status: {system.status}</div>
                Last Report:{" "}
                {new Date(system.meta.last_report_at * 1000).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
      <SystemStatus />
    </div>
    // <div>
    //   {status === "loading" && <div>Loading...</div>}
    //   {status === "failed" && <div>Error: {error}</div>}
    //   <ul>
    //     {systems.map((system) => (
    //       <li key={system.system_id}>
    //         <div>Name: {system.system_name || system.system_public_name}</div>
    //         <div>
    //           City: {system.city}, {system.postal_code}
    //         </div>
    //         <div>System Status: {system.status}</div>
    //         <div>
    //           Last Updated:{" "}
    //           {new Date(system.meta.last_report_at * 1000).toLocaleString()}
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default SystemInfo;
