import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ height = "80vh" }) => {
  return (
    <div className={`w-full h-[${height}] flex justify-center items-center bg-white dark:bg-black`}>
      <ReactLoading type={"bars"} color={"#6366F1"} height={"5%"} width={"5%"} />
    </div>
  );
};

export default Loader;