import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import postService from "../appwrite/post";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                if (slug) {
                    const dbpost = await postService.getPost(slug);
                    if (dbpost) {
                        setPost(dbpost);
                    }
                }
                else {
                    navigate("/");
                }
            } catch (error) {
                toast.error(error.message);
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