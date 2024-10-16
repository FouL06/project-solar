import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSystemInventory } from "../../Redux/features/systemInventorySlice";

const SystemInventory = () => {
  const dispatch = useDispatch();
  const { envoys, inverters, meters } = useSelector(
    (state) => state.systemInventory
  );

  useEffect(() => {
    dispatch(fetchSystemInventory());
    const intervalId = setInterval(() => {
      dispatch(fetchSystemInventory());
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <h3>Envoys</h3>
      {envoys.length > 0 ? (
        <ul>
          {envoys.map((envoy) => (
            <li key={envoy.sn}>
              {envoy.model} - {envoy.sn} (SKU: {envoy.sku})
            </li>
          ))}
        </ul>
      ) : (
        <p>No envoys available.</p>
      )}

      <h3>Inverters</h3>
      {inverters.length > 0 ? (
        <ul>
          {inverters.map((inverter) => (
            <li key={inverter.sn}>
              {inverter.model} - {inverter.sn} (SKU: {inverter.sku})
            </li>
          ))}
        </ul>
      ) : (
        <p>No inverters available.</p>
      )}

      <h3>Meters</h3>
      {meters.length > 0 ? (
        <ul>
          {meters.map((meter) => (
            <li key={meter.sn}>
              {meter.model} - {meter.sn} (Status: {meter.status}, State:{" "}
              {meter.state})
            </li>
          ))}
        </ul>
      ) : (
        <p>No meters available.</p>
      )}
    </div>
  );
};

export default SystemInventory;
