"use client";
import React, { useEffect } from "react";
import { connect } from "react-redux";

function App({ children, dispatch, ...props }) {
  const { _app_initialized } = props;

  useEffect(() => {
    dispatch({ type: "on_app_started" });
  }, [dispatch]);

  if(!_app_initialized) {
    return ( 
        <div></div> 
    );
  }

  return <>{children}</>;
}

const mapStateToProps = function (state) {
  return state.reducer;
};

export default connect(mapStateToProps, null)(App);
