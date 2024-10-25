import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSystemInventory } from "../../Redux/features/systemInventorySlice";
import { Bolt, ExpandMore } from "@mui/icons-material";
import {
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import "./systemInventory.css";
import { Apps } from "@mui/icons-material";

const SystemInventory = () => {
  const dispatch = useDispatch();
  const { inverters, status } = useSelector((state) => state.systemInventory);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchSystemInventory());
    // const intervalId = setInterval(() => {
    //   dispatch(fetchSystemInventory());
    // }, 5 * 60 * 1000);
    // return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div id="panel-container">
      <Accordion
        expanded={expanded}
        onChange={handleAccordionChange}
        className="centered-accordion"
        style={{ borderRadius: "16px", backgroundColor: "#f0f0f0" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Typography style={{ display: "flex", alignContent: "center" }}>
            <Apps />
            <h4 style={{ margin: "0px 0px 0px 4px" }}>
              Solar Panels & Inverters
            </h4>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {inverters && inverters.length > 0 ? (
            <div className="panel-grid">
              {inverters.map((inverter, index) => (
                <Tooltip
                  key={index}
                  disableFocusListener
                  disableTouchListener
                  title={
                    "Serial #: " +
                    inverter.sn +
                    " - Model: " +
                    inverter.model +
                    " - SKU: " +
                    inverter.sku +
                    " - Status: " +
                    status.toUpperCase()
                  }
                >
                  <div className="panel-card">
                    {status && (
                      <Bolt
                        style={{
                          height: "45px",
                          width: "45px",
                          backgroundColor:
                            status === "normal" ? "green" : "red",
                          borderRadius: "50%",
                          color: "white",
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
              ))}
            </div>
          ) : (
            <p>No inverters found</p>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SystemInventory;
