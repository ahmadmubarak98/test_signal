import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { DeviceInfo, Fallback, Profile, Slider } from "../components";
import names from "../data/names";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  const workflow = useSelector(({ app }) => app.workflow);

  useEffect(() => {
    console.log(workflow);
  }, [workflow]);

  return (
    <div className="home_page">
      <section>
        {workflow.loading ? (
          <div className="vw-100 vh-100">
            <Fallback />
          </div>
        ) : (
          <Container fluid>
            <Row className="Signals UserAll">
              {workflow &&
                Object.values(workflow.data)?.length > 0 &&
                !workflow.loading &&
                names.map(
                  (name, index) =>
                    workflow.data[name] && (
                      <Col xs={12} className="userInfo" key={index}>
                        <Row>
                          <Col lg={2} md={3} xs={12}>
                            <Profile name={name} />
                          </Col>
                          <Col lg={10} md={9} xs={12}>
                            <Link href={`/details/${name}`}>
                              <div className="devices">
                                <Slider
                                  items={Object.values(workflow.data[name])}
                                  itemAs={DeviceInfo}
                                />
                              </div>
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                    )
                )}
            </Row>
          </Container>
        )}
      </section>
    </div>
  );
}
