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
  const [wantRerender, setWantRerender] = useState(0);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    (async () => {
      const posts = await postService.getAllFavoritePosts([Query.equal("userId", `${userData.$id}`)]);
      const allPosts = await postService.getAllPost([]);
      if (posts && allPosts) {
        let favoritePosts = [];
        for (let i = 0; i < allPosts.documents.length; i++) {
          for (let j = 0; j < posts.documents.length; j++) {
            if (allPosts.documents[i].$id === posts.documents[j].postId) {
              favoritePosts.push(allPosts.documents[i]);
            }
          }
        }
        setAllFavoritePosts(favoritePosts);
      }
      setLoading(false);
    })();
  }, [wantRerender]);


  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 gap-12 max-lg:place-items-center">
          {allFavoritePosts.length > 0 && allFavoritePosts.map((post) => (
            <div key={post.$id} className="p-2 md:w-[310px]">
              <PostCard post={post} setWantRerender={setWantRerender} />
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