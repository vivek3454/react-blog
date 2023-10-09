import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdShare, MdFacebook, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { convert } from "html-to-text";
import { format } from "date-fns";
import fileService from "../appwrite/file";
import postService from "../appwrite/post";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function PostCard({ post }) {
    const ref = useRef(null);
    const currentPostUrl = `${window.location.href}/post/${post.$id}`;
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(true);
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleSharePopup = () => {
        setIsSharePopupOpen(!isSharePopupOpen);
    };
    const handleFavorite = () => {
        setIsFavorite(!isFavorite);

        (async () => {
            postService.addToFavorite({ post, userId: userData.$id })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    toast.error(error.message);
                })
                .finally(() => setLoading(false));
        })();

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
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-[360px] relative">
            <Link to={`/post/${post.$id}`}>
                <div className="w-full justify-center mb-4">
                    <img src={fileService.getFilePreview(post.featuredImage)} alt={post.title}
                        className="rounded-xl" />

                </div>
            </Link>
            <h2
                className="text-xl font-bold"
            >{post.title}</h2>
            <p className="dark:text-gray-500 text-gray-700 text-base mb-2">
                {format(new Date(post.$createdAt), "MMMM d, yyy")}
            </p>
            <p className="dark:text-gray-600 text-gray-700 text-base line-clamp-3">
                {convert(post.content)}
            </p>
            <div ref={ref} className="flex gap-2 mt-3">
                {isFavorite ?
                    <MdFavorite className="text-red-500" cursor={"pointer"} size={23} onClick={handleFavorite} />
                    : <MdFavoriteBorder cursor={"pointer"} size={23} onClick={handleFavorite} />}
                <MdShare cursor={"pointer"} size={23} onClick={handleSharePopup} />

                <div className={`${isSharePopupOpen ? "flex" : "hidden"} gap-2 absolute bottom-5 left-[70px] bg-gray-100 dark:bg-gray-800 shadow-2xl dark:shadow-black shadow-gray-500 p-4 rounded-md mt-3`}>
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
                        <FaTwitter className="text-blue-500" size={23} />
                    </TwitterShareButton>
                </div>
            </div>
        </div>
    );
}


export default PostCard;