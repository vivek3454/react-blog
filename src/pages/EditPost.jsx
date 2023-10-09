import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import postService from "../appwrite/post";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const [post, setPost] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (slug) {
                const dbpost = await postService.getPost(slug);
                console.log(dbpost);
                if (dbpost) {
                    setPost(dbpost);
                }
            }
            else {
                navigate("/");
            }
        })();
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;