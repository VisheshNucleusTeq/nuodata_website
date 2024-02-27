import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserDetailsAction, loderShowHideAction } from "../../Redux/action";
import { GETUSERDETAILS } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";

const Sso_login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getSession = async () => {
    try {
      let userDetailsObj = {};
      dispatch(loderShowHideAction(true));
      const response = await axios.get("/api/auth/profile/");
      const { user, accessToken, refreshToken, accessTokenExpiresAt } =
        response?.data;

      accessToken && localStorage.setItem("authToken", accessToken);
      refreshToken && localStorage.setItem("refreshToken", refreshToken);
      accessTokenExpiresAt &&
        localStorage.setItem("expiryTime", accessTokenExpiresAt);

      const userDetails = await fetch_retry_get(
        `${GETUSERDETAILS}${user?.sub}`
      );
      if (userDetails.success) {
        userDetailsObj = userDetails?.data;
      }

      localStorage.setItem(
        "authData",
        JSON.stringify({
          ...user,
          ...{
            userId: user?.sub ? user?.sub : "NA",
            firstName: user?.given_name ? user?.given_name : "NA",
            lastName: user?.family_name ? user?.family_name : "NA",
            email: user?.email ? user?.email : "NA",
            mobileNo: user?.mobileNo ? user?.mobileNo : "NA",
            jobTitle: user?.jobTitle ? user?.jobTitle : "NA",
            orgId: user?.orgId ? user?.orgId : "NA",
            orgName: user?.orgName ? user?.orgName : "NA",
            roleName: user?.roleName ? user?.roleName : "NA",
          },
          ...userDetailsObj,
        })
      );
      dispatch(UserDetailsAction(true));
      const delayDebounceFn = setTimeout(() => {
        dispatch(loderShowHideAction(false));
        router.push("/ingestion/workspace/");
      }, 100);
      return () => clearTimeout(delayDebounceFn);
    } catch (error) {
      dispatch(loderShowHideAction(false));
      router.push("/");
    }
  };
  useEffect(() => {
    getSession();
  }, []);
  return <p style={{ textAlign: "center" }}>Loading...</p>;
};

export default Sso_login;
