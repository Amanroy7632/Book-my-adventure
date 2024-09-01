import React, { useState } from "react";
import "./dumy.css";

const BusBox = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`bus-box ${isExpanded ? 'bus-box-expanded' : ''}`}>
            <div className="busBoxSection1">
                {/* Content here */}
            </div>
            {isExpanded && (
                <div className="busBoxSection2">
                    {/* Additional content that shows up when expanded */}
                </div>
            )}
            <button onClick={toggleExpand}>
                {isExpanded ? "Collapse" : "Expand"}
            </button>
        </div>
    );
};

export default BusBox;
