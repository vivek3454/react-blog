import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard, Skeleton } from "../components/index";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyPosts = () => {
    const skeletonArray = Array(8).fill("");
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const allPosts = useSelector((state) => state.post.allPosts);
    useEffect(() => {
        if (allPosts) {
            const filteredPosts = allPosts.filter((post) => post.userId === userData.$id);
            setMyPosts(filteredPosts);
            setLoading(false);
        }
    }, [allPosts]);

    return (
        <div className="w-full py-8">
            <Container>
                {myPosts.length === 0 && !loading &&
                    <div className="flex w-full h-[80vh] text-lg justify-center items-center">Not created any post <Link to={"/add-post"} className="text-blue-500 ml-2">Create Post</Link></div>
                }
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 gap-12 max-lg:place-items-center">
                    {myPosts.length > 0 && myPosts.map((post) => (
                        <div key={post.$id} className="p-2 md:w-[310px]">
                            <PostCard post={post} />
                        </div>
                    ))}
                    {loading && myPosts.length === 0 &&
                        skeletonArray.map((_, index) => (
                            <Skeleton key={index} />
                        ))
                    }
                </div>
            </Container>
        </div>
    );
};

export default MyPosts;