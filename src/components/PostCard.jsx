import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdShare, MdFacebook } from "react-icons/md";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { convert } from "html-to-text";
import { format } from "date-fns";
import fileService from "../appwrite/file";

function PostCard({ post }) {
    const currentPostUrl = `${window.location.href}/post/${post.$id}`;
    const ref = useRef(null);
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

    const handleSharePopup = () => {
        setIsSharePopupOpen(!isSharePopupOpen);
    };

    useEffect(() => {
        const closeSharePopup = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsSharePopupOpen(false);
            }
        };

        document.addEventListener("click", closeSharePopup);
        return () => {
            document.removeEventListener("click", closeSharePopup);
        };
    }, []);


    return (
        <div className="w-full bg-gray-100 rounded-xl p-4 h-[360px] relative">
            <Link to={`/post/${post.$id}`}>
                <div className="w-full justify-center mb-4">
                    <img src={fileService.getFilePreview(post.featuredImage)} alt={post.title}
                        className="rounded-xl" />

                </div>
            </Link>
            <h2
                className="text-xl font-bold"
            >{post.title}</h2>
            <p className="text-gray-700 text-base mb-2">
                {format(new Date(post.$createdAt), "MMMM d, yyy")}
            </p>
            <p className="text-gray-700 text-base line-clamp-3">
                {convert(post.content)}
            </p>
            <div ref={ref} className="flex gap-2 mt-3 ">
                <MdShare cursor={"pointer"} size={23} onClick={handleSharePopup} />
                <div className={`${isSharePopupOpen ? "flex" : "hidden"} gap-2 absolute bottom-5 left-16 bg-gray-100 shadow-2xl shadow-gray-500 p-4 rounded-md mt-3`}>
                    <FacebookShareButton
                        url={currentPostUrl}
                    >
                        <MdFacebook className="text-blue-600" size={28} />
                    </FacebookShareButton>
                    <LinkedinShareButton
                        url={currentPostUrl}
                    >
                        <FaLinkedin className="text-blue-800" size={23} />
                    </LinkedinShareButton>
                    <TwitterShareButton
                        url={currentPostUrl}
                    >
                        {/* <TwitterIcon width={22} /> */}
                        <FaTwitter className="text-blue-500" size={23} />
                    </TwitterShareButton>
                </div>
            </div>
        </div>
    );
}


export default PostCard;