import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWorkflow } from "./store/app";
import names from "./data/names";

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    names.forEach((name) => {
      dispatch(getWorkflow(name));
    });
  }, [dispatch]);
  return <Fragment>{children}</Fragment>;
};

export default Wrapper;
