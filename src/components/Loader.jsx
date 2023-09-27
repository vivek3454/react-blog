import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
        <ReactLoading type={"bars"} color={"#6366F1"} height={"5%"} width={"5%"} />
    </div>
  );
};

export default Loader;