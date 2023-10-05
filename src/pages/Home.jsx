import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, Loader, PostCard } from "../components/index";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setLoading(false);
            }
        })
        .catch((error)=>{
            console.log(error);
        });
    }, []);

    if (!loading && posts.length === 0) {
        return (
            <div className="p-2 w-full flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
            </div>
        );
    }
    if (loading && posts.length === 0) {
        return (
            <Loader />
        );
    }
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );

};

export default Home;