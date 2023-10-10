/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import fileService from "../../appwrite/file";
import postService from "../../appwrite/post";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
    let defaults = {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active"
    };
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: defaults,
    });

    useEffect(() => {
        reset(defaults);
    }, [post, reset]);


    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (post) {
            (async () => {
                post && setFile(fileService.getFilePreview(post?.featuredImage));
            })();
        }
    }, [post]);


    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        if (post) {
            const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null;

            if (file) {
                fileService.deleteFile(post.featuredImage);
            }

            const dbPost = await postService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            setLoading(false);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await postService.createPost({ ...data, userId: userData.$id });
                setLoading(false);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex gap-4 flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 dark:bg-gray-800 dark:text-white text-black"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 dark:bg-gray-800 dark:text-white text-black"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 dark:bg-gray-800 dark:text-white text-black"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={file}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 dark:bg-gray-800 dark:text-white text-black"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor="bg-[#9ED5CB]" textColor="text-black" className="w-full flex justify-center items-center hover:bg-white gap-4">
                    {loading && post && "Updating..."}
                    {!loading && post && "Update"}
                    {loading && !post && "Submiting..."}
                    {!loading && !post && "Submit"}
                </Button>
            </div>
        </form>
    );
};
export default PostForm;