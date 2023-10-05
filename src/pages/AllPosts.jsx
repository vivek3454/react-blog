import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard, Skeleton } from "../components/index";
import toast from "react-hot-toast";

const AllPosts = () => {
    const skeletonArray = Array(8).fill("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        postService.getAllPost([])
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

export default AllPosts;