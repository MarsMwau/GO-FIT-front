import React, { useState } from "react";
import "./Sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  console.log(window.innerWidth);
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img
            src="data:image/png;base64,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"
            alt="logo"
          />
          <span>
            Go<span>Fi</span>t
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <Link
                to={item.path}
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </Link>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
