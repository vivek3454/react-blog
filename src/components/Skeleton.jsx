import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const SkeletonComponent = () => {
    const status = useSelector((state) => state.theme.status);
    return (
        <div className="p-2">
            <div className="w-[290px] p-4 h-[370px] rounded-xl bg-gray-100 dark:bg-gray-800 textgray">
                <SkeletonTheme baseColor={`${status === "dark" ? "#2f3641" : "#ccc"}`} highlightColor={`${status === "dark" ? "#a1a1a1" : "#fff"}`}>
                    <Skeleton count={1} borderRadius={15} height={150} className="mb-4" />
                    <Skeleton count={1} height={18} width={200} />
                    <Skeleton count={1} height={18} width={200} className="mb-4" />
                    <Skeleton count={3} height={18} />
                    <div className="mt-2 flex gap-3">
                        <Skeleton circle count={1} height={22} width={22} />
                        <Skeleton circle count={1} height={22} width={22} />
                    </div>
                </SkeletonTheme>
            </div>
        </div>
    );
};

export default SkeletonComponent;