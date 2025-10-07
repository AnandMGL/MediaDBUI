import axios from "axios";

export const getMainUrl = () => {
  // return "http://146.120.18.92:9191"
  // return "http://112.175.18.143:9090";
     return `http://localhost:9090`;
  // return `http://192.168.0.84:8080`;
  // return `http://192.168.0.173:8080`;
  // return "http://192.82.66.43:7070";
};

async function mainCaller(path, method = "GET", data = null, headers) {
  // const user = localStorage.getItem("user");
  // const {token} = JSON.parse(user)

  const options = {
    url: `${getMainUrl()}/${path}`,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    method,
    withCredentials: false,
  };
  if (data) {
    options.data = data;
  }

  const res = await axios(options).catch((err) => {
    console.log(err);
    throw err;
  });
  return res.data;
}

export async function mainCallerFileWithToken(
  path,
  method = "GET",
  data = null
) {
  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(user);

    const options = {
      url: `${getMainUrl()}/${path}`,
      headers: {
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      method,
      withCredentials: false,
    };
    if (data) {
      options.data = data;
    }

    const res = await axios(options).catch((err) => {
      console.log(err);
      throw err;
    });
    return res.data;
  }
}


export async function mainCallerFileWithTokenPost(
  path,
  method = "POST",
  data = null
) {
  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(user);

    const options = {
      url: `${getMainUrl()}/${path}`,
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
      method,
      withCredentials: false,
    };
    if (data) {
      options.data = data;
    }

    const res = await axios(options).catch((err) => {
      console.log(err);
      throw err;
    });
    return res.data;
  }
}


export async function mainCallerTokenPost(path, method = "POST", data = null) {
  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(user);

    const options = {
      url: `${getMainUrl()}/${path}`,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method,
      withCredentials: false,
    };
    if (data) {
      options.data = data;
    }

    const res = await axios(options).catch((err) => {
      console.log(err);
      throw err;
    });
    return res.data;
  }
}

export async function mainCallerToken(path, method = "GET", data = null) {
  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(user);

    const options = {
      url: `${getMainUrl()}/${path}`,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method,
      withCredentials: false,
    };
    if (data) {
      options.data = data;
    }

    const res = await axios(options).catch((err) => {
      console.log(err);
      throw err;
    });
    return res.data;
  }
}

export async function mainCallerDecode(path, method = "POST", data = null) {
  const options = {
    url: `${getMainUrl()}/${path}`,
    headers: {
      ContentType: "multipart/form-data",
    },
    method,
    withCredentials: false,
  };
  if (data) {
    options.data = data;
  }

  const res = await axios(options).catch((err) => {
    console.log(err);
    throw err;
  });
  return res.data;
}

export async function mainCallerWithOutToken(
  path,
  method = "GET",
  data = null
) {
  const options = {
    url: `${getMainUrl()}/${path}`,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    method,
    withCredentials: false,
  };
  if (data) {
    options.data = data;
  }

  const res = await axios(options).catch((err) => {
    console.log(err);
    throw err;
  });
  return res.data;
}

export async function getTermsAndCondition(
  path,
  method = "GET",
  data = null
) {
  const options = {
    url: `${getMainUrl()}/${path}`,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    method,
    withCredentials: false,
  };
  if (data) {
    options.data = data;
  }

  const res = await axios(options).catch((err) => {
    console.log(err);
    throw err;
  });
  return res.data;
}


export async function pilaAuthUser(password, username) {
  const { data } = await axios.post(
    getMainUrl() + "/signIn",
    {
      username: username,
      password: password,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return data;
}

export default mainCaller;
