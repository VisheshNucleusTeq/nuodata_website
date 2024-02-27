import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UserDetailsAction } from "../../Redux/action";

const Sso = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auth/profile/");
        console.log(response)
        const { accessToken, refreshToken, accessTokenExpiresAt } =
          response?.data;
        accessToken && localStorage.setItem("authToken", accessToken);
        refreshToken && localStorage.setItem("refreshToken", refreshToken);
        accessTokenExpiresAt &&
          localStorage.setItem("expiryTime", accessTokenExpiresAt);

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
          })
        );
        dispatch(UserDetailsAction(true));
        const delayDebounceFn = setTimeout(() => {
          alert(1)
          router.push("/ingestion/workspace/");
        }, 100);
        return () => clearTimeout(delayDebounceFn);
      } catch (error) {
        alert(2)
        localStorage.clear();
        router.push("/api/auth/login");
      }
    };
    const delayDebounceFn = setTimeout(() => {
      !isLoading && fetchData();
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [isLoading]);

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <div>{error.message}</div>;
  if (user) return <p style={{ textAlign: "center" }}>Loading...</p>;
  // if (user) return <div>Welcome {user.name}</div>;
};

export default Sso;