import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard, Skeleton } from "../components/index";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

const MyPosts = () => {
    const skeletonArray = Array(8).fill("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state?.auth?.userData);
    useEffect(() => {
        postService.getAllPost([Query.equal("userId", `${userData?.$id}`)])
            .then((post) => {
                if (post) {
                    setPosts(post.documents);
                    setLoading(false);
                }
            })
            .catch((error) => toast.error(error));
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                {posts.length === 0 && !loading &&
                    <div className="flex w-full h-[90vh] justify-center items-center">No Post</div>
                }
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 gap-12 max-lg:place-items-center">
                    {posts.length > 0 && posts.map((post) => (
                        <div key={post.$id} className="p-2 md:w-[310px]">
                            <PostCard post={post} />
                        </div>
                    ))}
                    {loading && posts.length === 0 &&
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