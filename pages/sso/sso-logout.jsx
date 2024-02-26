import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loderShowHideAction } from "../../Redux/action";
const Sso_logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(loderShowHideAction(true));
    await axios.get("/api/auth/local_logout/");
    var cookies = document?.cookie?.split(";");
    for (var i = 0; i < cookies?.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    localStorage.clear();
    dispatch(loderShowHideAction(false));
    router.push("/");
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      logout();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, []);
  return <p style={{textAlign : "center"}}>Loading...</p>;
};

export default Sso_logout;
