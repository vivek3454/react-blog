import React, { useEffect, useState } from "react";
import { Container, PostCard, Skeleton } from "../components/index";
import { useSelector } from "react-redux";

const Home = () => {
    const skeletonArray = Array(8).fill("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const allPosts = useSelector((state) => state.post.allPosts);

    useEffect(() => {
        setPosts(allPosts);
        setLoading(false);
    }, [allPosts]);


    if (!loading && posts?.length === 0 && !userData) {
        return (
            <div className="p-2 w-full flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
            </div>
        );
    }

    if (!loading && posts?.length === 0 && userData) {
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
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 gap-12 max-lg:place-items-center">
                    {posts?.length > 0 && posts.map((post) => (
                        <div key={post.$id} className="p-2 md:w-[310px]">
                            <PostCard post={post} />
                        </div>
                    ))}
                    {loading && posts?.length === 0 &&
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