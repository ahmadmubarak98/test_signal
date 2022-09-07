import React from "react";
import { Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress({ percentage }) {
  const [percentageState, setPercentageState] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
        setPercentageState(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CircularProgressbar
        value={percentageState}
        text={`${percentageState}%`}
        styles={buildStyles({
          rotation: 0.25,
          pathTransitionDuration: 3,
          pathColor: `#4ebff3`,
          textColor: "#4ebff3",
          trailColor: "#fff",
          background: "#f00",
          path: {
            // Path color
            stroke: `rgba(62, 152, 199, ${percentageState / 100})`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Customize transition animation
            transition: "stroke-dashoffset 0.5s ease 0s",
            // Rotate the path
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          background: {
            fill: "#3e98c7",
          },
        })}
      />
    </>
  );
}
