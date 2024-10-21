import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSystemInventory } from "../../Redux/features/systemInventorySlice";
import { Bolt } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import "./systemInventory.css";

const SystemInventory = () => {
  const dispatch = useDispatch();
  const { envoys, inverters, meters } = useSelector(
    (state) => state.systemInventory
  );

  useEffect(() => {
    dispatch(fetchSystemInventory());
    // const intervalId = setInterval(() => {
    //   dispatch(fetchSystemInventory());
    // }, 5 * 60 * 1000);
    // return () => clearInterval(intervalId);
  }, [dispatch]);

  // TODO: create hover card over panel to display info
  // about the panel/inverter

  return (
    <div id="panel-container">
      {inverters && inverters.length > 0 ? (
        inverters.map((inverter, index) => (
          <Tooltip
            disableFocusListener
            disableTouchListener
            title={
              "Serial #: " +
              inverter.sn +
              " - Model: " +
              inverter.model +
              " - SKU: " +
              inverter.sku
            }
          >
            <div key={index} className="panel-card">
              <Bolt
                style={{
                  height: "45px",
                  width: "45px",
                  backgroundColor: "lightgreen",
                  borderRadius: "50%",
                }}
              />
            </div>
          </Tooltip>
        ))
      ) : (
        <p>No inverters found</p>
      )}
    </div>
  );
};

export default SystemInventory;
