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

const SystemInventory = () => {
  const dispatch = useDispatch();
  const { inverters } = useSelector((state) => state.systemInventory);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchSystemInventory());
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
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Typography>System Inventory</Typography>
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
                    inverter.sku
                  }
                >
                  <div className="panel-card">
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
