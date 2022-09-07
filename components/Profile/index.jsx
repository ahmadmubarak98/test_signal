import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";

function Profile({ name, list }) {
  return (
    <div className="profile">
      <Row>
        <Col xs={12}>
          <Link href={`/details/${name}`}>
            <img alt="Profile" src="/images/dummyteam.png" className="mw-100" />
          </Link>
        </Col>
        <Col xs={12}>
          <h2>
            <Link href={`/details/${name}`} className="fs-3">
              {name}
            </Link>
          </h2>
        </Col>
        {list && (
          <Col xs={12}>
            <ul>
              <li className="active">
                <Link href="#">حسب الموعد</Link>
              </li>
              <li>
                <span>الأعلى نقدا</span>
              </li>
              <li>
                <span>متابعه خاصه</span>
              </li>
              <li>
                <span>أجهزة الزبائن</span>
              </li>
              <li>
                <span>أجهزة المحلات</span>
              </li>
            </ul>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Profile;
