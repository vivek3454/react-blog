import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/post";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import fileService from "../appwrite/file";
import toast from "react-hot-toast";
import { getAllPost } from "../store/slices/postSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Post = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const status = useSelector((state) => state.theme.status);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        (async () => {
            if (slug) {
                try {
                    const post = await postService.getPost(slug);
                    if (post) {
                        setLoading(false);
                        setPost(post);
                    }
                    else navigate("/");
                } catch (error) {
                    setLoading(false);
                    toast.error(error.message);
                }
            }
            else navigate("/");
        })();
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            toast.loading("Deleting Post");
            await Promise.all([postService.deletePost(post.$id), fileService.deleteFile(post.feturedImage)]);
            toast.dismiss();
            toast.success("Deleted Post");
            dispatch(getAllPost());
            navigate("/my-posts");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="py-8">
            <Container>
                {!loading && post && <>
                    <div className="w-full flex justify-center mb-4 relative p-2">
                        <div className="max-w-3xl h-80 max-sm:h-40 w-full">
                            <img
                                src={fileService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl w-full h-full"
                            />
                        </div>

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3 hover:bg-green-600 border-none">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="hover:bg-red-600 border-none" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6 flex justify-center">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                </>
                }
                {
                    loading &&
                    <SkeletonTheme baseColor={`${status === "dark" ? "#2f3641" : "#ccc"}`} highlightColor={`${status === "dark" ? "#a1a1a1" : "#fff"}`}>
                        <div className="max-w-3xl mx-auto">
                            <Skeleton count={1} borderRadius={15} className="h-80 max-sm:h-40 w-full mb-8 md:mb-14" />
                        </div>
                        <div className="w-full">
                            <Skeleton count={1} borderRadius={5} height={30} className="mb-4" />
                        </div>
                        <div className="browser-css">
                            <Skeleton count={1} borderRadius={5} height={200} />
                        </div>
                    </SkeletonTheme>
                }
            </Container>
        </div>
    );

};

export default Post;