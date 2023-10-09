import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard, Skeleton } from "../components/index";
import toast from "react-hot-toast";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

const FavoritePosts = () => {
  const [allFavoritePosts, setAllFavoritePosts] = useState([]);
  const skeletonArray = Array(8).fill("");
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    (async () => {
      postService.getAllFavoritePosts([Query.equal("userId", `${userData.$id}`)])
        .then((posts) => {
          if (posts) {
            setAllFavoritePosts(posts.documents);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoading(false));
    })();
  }, []);


  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {allFavoritePosts.length > 0 && allFavoritePosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
          {loading && allFavoritePosts.length === 0 &&
            skeletonArray.map((_, index) => (
              <Skeleton key={index} />
            ))
          }
        </div>
      </Container>
    </div>
  );
};

export default FavoritePosts;