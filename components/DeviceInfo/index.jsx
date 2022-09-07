import classNames from "classnames";
import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Countdown from "react-countdown-now";

function DeviceInfo(props) {
  const [timeOut, setTimeOut] = React.useState(false);
  const [timeOfEnd, setTimeOfEnd] = React.useState(false);
  const currentTime = moment().format("x");

  React.useEffect(() => {
    let time = props["تاريخ الاستلام"] + " " + props["وقت الإستلام"];
    let formatedTime = moment(props["تعديل موعد التسليم"]).format("x");

    // if (props["موعد التسليم"] === "يومين")
    //   formatedTime = moment(time).add("days", 2).format("x");

    // if (props["موعد التسليم"] === "يوم")
    //   formatedTime = moment(time).add("days", 1).format("x");

    // if (props["موعد التسليم"] === "٤ ساعات")
    //   formatedTime = moment(time).add(4, "hours").format("x");

    // if (props["موعد التسليم"] === "ساعتين")
    //   formatedTime = moment(time).add(2, "hours").format("x");

    // if (props["موعد التسليم"] === "ساعة")
    //   formatedTime = moment(time).add(1, "hours").format("x");

    setTimeOfEnd(Number(formatedTime));

    if (Number(formatedTime) < moment().format("x")) {
      setTimeOut(true);
    }
  }, [currentTime, setTimeOfEnd, props]);

  return (
    <div className="deviceInfo-container">
      <Row>
        <Col xs={12}>
          <p className="timer">
            <Countdown date={timeOfEnd ? timeOfEnd : 0}>
              <span>00:00:00:00</span>
            </Countdown>
          </p>
        </Col>
        <Col xs={12}>
          <div className={classNames("deviceInfo", { timeOut: timeOut })}>
            <Row>
              <Col xs={12}>
                <h3 className="fs-4">{props["اسم الجهاز"]}</h3>
              </Col>
              <Col xs={12}>
                <h4 className="fs-4">{props["اسم الزبون"]}</h4>
              </Col>
              <Col xs={12}>
                <h5 className="fs-5">{props["المشكلة"]}</h5>
              </Col>
              <Col xs={12}>
                <div className="d-flex justify-content-between">
                  <h6>120</h6>
                  <span>1</span>
                </div>
              </Col>
            </Row>
            {timeOut && <img alt="Time is Out" src="/images/stopwatch.png" />}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(DeviceInfo);
