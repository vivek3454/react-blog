import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard } from "../components/index";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {

    }, []);

    postService.getAllPost([]).then((post) => {
        if (post) {
            setPosts(post.documents);
        }
    });

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts && posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;