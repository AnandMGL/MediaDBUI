import { useEffect, useState } from "react";

const useMediaQuery = (maxWidth) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     window.location.reload();
  //   };
  // }, [width]);

  return width <= maxWidth;
};

export default useMediaQuery;
