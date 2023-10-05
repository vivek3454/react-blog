import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComponent = () => {
    return (
        <div className="p-2">
            <div className="w-[300px] p-4 h-56 rounded-xl bg-gray-100">
                <SkeletonTheme baseColor="#ccc" highlightColor="#fff">
                    <Skeleton count={1} borderRadius={15} height={150} className="mb-4" />
                    <Skeleton count={1} height={20} width={200} />
                </SkeletonTheme>
            </div>
        </div>
    );
};

export default SkeletonComponent;