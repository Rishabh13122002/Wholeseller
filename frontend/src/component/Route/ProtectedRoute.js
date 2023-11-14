import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      <Route {...rest}>
        {loading === false && (
          <Navigate
            to="/login"
            replace={isAuthenticated === false}
          />
        )}
        {isAuthenticated && <Component {...rest} />}
      </Route>
    </Fragment>
  );
};

export default ProtectedRoute;

{/*
            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
        */}
            