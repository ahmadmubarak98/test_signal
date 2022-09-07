import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  CircularProgress,
  DeviceInfo,
  Fallback,
  Profile,
} from "../../components";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";

const statuses = ["تم الإصلاح", "لم يتم الإصلاح", "قيد العمل"];
const categories = ["Level 1", "Level 2", "Level 3", "عطل غير محدد"];

export default function Details() {
  const [userData, setUserData] = React.useState([]);
  const [reportData, setReportData] = React.useState({
    statuses: {},
    categories: {},
    late: 0,
  });
  const [loadingUserData, setLoadingUserData] = React.useState(false);
  const [loadingReportsData, setLoadingReportsData] = React.useState(false);
  const [dataLimit, setDataLimit] = React.useState({ from: 0, to: 10 });
  const router = useRouter();
  const { name } = router.query;
  const tomorrow = moment().subtract(1, "days").format("YYYY/MM/DD");
  console.log(name);

  const getUserData = async ({ limit, deviceStatus }) => {
    setLoadingUserData(true);
    try {
      const response = await fetch(
        `/api/make-request?url=https://www.ragic.com/signals/workflow2/8?limit=${
          limit?.from ? limit.from : 0
        },${
          limit?.to ? limit.to : 10
        }&where=1002256,eq,${name}&where=1002252,eq,${deviceStatus}`
      ).then((response) => response.json());
      const data = await response.data;
      setLoadingUserData(false);
      return data;
    } catch (error) {
      const { response } = error;
      setLoadingUserData(false);
      return {};
    }
  };

  const getReportsData = async (params) => {
    try {
      const response = await fetch(
        `/api/make-request?url=https://www.ragic.com/signals/workflow2/8?&where=1002256,eq,${name}&where=1002258,eq,${tomorrow}${params}`
      ).then((response) => response.json());
      const data = await response.data;
      return Object.values(data).length;
    } catch (error) {
      const { response } = error;
      return 0;
    }
  };

  React.useEffect(() => {
    const dataGetter = async () => {
      let data = await getUserData({
        limit: dataLimit,
        deviceStatus: "قيد العمل",
      });
      data = Object.values(data);

      setUserData((prev) => [...prev, ...data]);
    };
    dataGetter();
  }, [name, dataLimit.to, dataLimit.from]);

  React.useEffect(() => {
    setLoadingReportsData(true);

    const getReportsGetter = async () => {
      for (let i = 0; i < statuses.length; i++) {
        let data = await getReportsData(`&where=1002252,eq,${statuses[i]}`);
        setReportData((prev) => ({
          ...prev,
          statuses: { ...prev.statuses, [statuses[i]]: data },
        }));
      }
      for (let i = 0; i < categories.length; i++) {
        let data = await getReportsData(`&where=1002249,eq,${categories[i]}`);
        setReportData((prev) => ({
          ...prev,
          categories: { ...prev.categories, [categories[i]]: data },
        }));
      }
      let data = await getReportsData(`&where=1002450,eq,نعم`);
      setReportData((prev) => ({
        ...prev,
        late: data,
      }));
    };
    getReportsGetter().then(() => {
      setLoadingReportsData(false);
    });
  }, [name]);

  if (typeof name === "undefined") return null;
  return (
    <div className="details_page">
      <section className="userInfoDet-section py-5">
        <div className="container">
          <Row>
            <Col xs={12} className="userInfoDet">
              <Row className={loadingUserData ? "align-items-center" : ""}>
                <Col xl={2} lg={3} md={4} xs={12}>
                  <Profile list name={name} />
                </Col>
                {loadingUserData ? (
                  <Col xl={10} lg={9} md={8} xs={12} className="h-100">
                    <Fallback />
                  </Col>
                ) : (
                  userData &&
                  userData?.length > 0 &&
                  userData && (
                    <Col xl={10} lg={9} md={8} xs={12} className="">
                      <Row className="gy-5">
                        {userData.map((device, index) => (
                          <Col xl={3} lg={4} md={6} xs={6} key={index}>
                            <DeviceInfo {...device} />
                          </Col>
                        ))}
                      </Row>

                      {userData && userData?.length === dataLimit?.to && (
                        <Row>
                          <Col xs={12}>
                            <div className="mt-4 mt-lg-5 text-center">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() =>
                                  setDataLimit((prev) => ({
                                    from: prev.from + 10,
                                    to: prev.to + 10,
                                  }))
                                }
                              >
                                حمل المزيد...
                              </button>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </section>
      <section className="userInfoChart-section">
        <div className="container">
          {loadingReportsData ? (
            <div style={{ minHeight: "300px", height: "300px" }}>
              <Row>
                <Col xs={12} className="userInfoChart">
                  <Row>
                    <Col className="col-xl-3 col-md-6 col-12  Lists">
                      <Skeleton count={1} height={240} />
                    </Col>
                    <Col className="col-xl-3 col-md-6 col-12  Lists">
                      <Skeleton count={1} height={240} />
                    </Col>
                    <Col className="col-xl-3 col-md-6 col-12  Lists">
                      <Skeleton count={1} height={240} />
                    </Col>
                    <Col className="col-xl-3 col-md-6 col-12  Lists">
                      <Skeleton count={1} height={240} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          ) : (
            <Row>
              <Col xs={12} className="userInfoChart">
                <Row>
                  <Col className="col-xl-3 col-md-6 col-12  Lists">
                    <Row>
                      <Col xs={12}>
                        <h1>توزيع الأعطال</h1>
                      </Col>
                      <Col xs={12}>
                        <ol className="issues-list">
                          {reportData?.categories &&
                            Object.keys(reportData?.categories).map(
                              (key, index) => (
                                <li
                                  className="issues d-flex w-100 justify-content-between align-items-center"
                                  key={index}
                                >
                                  <h4>{key}</h4>
                                  <h3 className="rounded-number">
                                    {reportData?.categories[key]}
                                  </h3>
                                </li>
                              )
                            )}
                        </ol>
                      </Col>
                    </Row>
                  </Col>

                  <Col className="col-xl-4 col-md-6 col-12 Lists">
                    <Row>
                      <Col xs={12}>
                        <h1>تقرير اليوم السابق</h1>
                      </Col>
                      <Col xs={12}>
                        <ol className="Reports">
                          <li className="issues d-flex w-100 justify-content-between align-items-center">
                            <h4>عدد الأجهزة المنتجة تصلح</h4>
                            <h3 className="rounded-number">
                              {reportData?.statuses["تم الإصلاح"]}
                            </h3>
                          </li>
                          <li className="issues d-flex w-100 justify-content-between align-items-center">
                            <h4>عدد الأجهزة المنتجة لا تصلح</h4>
                            <h3 className="rounded-number">
                              {reportData?.statuses["لم يتم الإصلاح"]}
                            </h3>
                          </li>
                          <li className="issues d-flex w-100 justify-content-between align-items-center">
                            <h4>عدد الأجهزة المعادة </h4>
                            <h3 className="rounded-number">
                              {reportData?.statuses["لم يتم الإصلاح"]}
                            </h3>
                          </li>
                          <li className="issues d-flex w-100 justify-content-between align-items-center">
                            <h4> عدد الاجهزة قيد العمل</h4>
                            <h3 className="rounded-number">
                              {reportData?.statuses["قيد العمل"]}
                            </h3>
                          </li>
                          <li className="issues d-flex w-100 justify-content-between align-items-center">
                            <h4> عدد الاجهزة التي تجاوزت الموعد</h4>
                            <h3 className="rounded-number">
                              {reportData?.late}
                            </h3>
                          </li>
                        </ol>
                      </Col>
                    </Row>
                  </Col>

                  <Col className="col-xl-2 col-md-6 col-12 DeviceNumber ">
                    <Row>
                      <Col xs={12}>
                        <h1>عدد الاجهزة المنتجه</h1>
                      </Col>
                      <Col xs={12}>
                        <h3>
                          {reportData?.statuses["تم الإصلاح"] +
                            reportData?.statuses["لم يتم الإصلاح"]}{" "}
                          أجهزة
                        </h3>
                      </Col>
                      <Col xs={12}>
                        <h2>الكفاءة الإنتاجية</h2>
                      </Col>
                      <Col xs={12}>
                        <div className="progress">
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              style={{ width: "40%" }}
                            >
                              40%
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>

                  <Col className="col-xl-3 col-md-6 col-12  DeviceNumber Progressbar">
                    <Row>
                      <Col xs={12}>
                        <h1>نسبة الاصلاح</h1>
                      </Col>
                      <Col xs={12} className="d-flex justify-content-center">
                        <div className="w-50">
                          <CircularProgress percentage={60} />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      </section>
    </div>
  );
}
