import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, Loader, PostCard, Skeleton } from "../components/index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
    const skeletonArray = Array(8).fill("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        postService.getAllPost()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => setLoading(false));
    }, []);


    if (!loading && posts.length === 0 && !userData) {
        return (
            <div className="p-2 w-full flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
            </div>
        );
    }

    if (!loading && posts.length === 0 && userData) {
        return (
            <div className="p-2 w-full flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    There is no post.
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full py-8 dark:bg-black bg-white">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 && posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
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

export default Home;