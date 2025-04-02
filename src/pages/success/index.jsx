import React, { useEffect } from "react";

export default function Success() {
  const queryParameters = new URLSearchParams(window.location.search);

  // const data = queryParameters.get("EncodeData");
  const name = queryParameters.get("name");
  const birthDate = queryParameters.get("birthDate");
  const gender = queryParameters.get("gender");

  const obj = {
    name: name,
    birthDate: birthDate,
    gender: gender,
  };

  useEffect(() => {
    window.opener.postMessage(obj, "*");
    window.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Processing</div>;
}
