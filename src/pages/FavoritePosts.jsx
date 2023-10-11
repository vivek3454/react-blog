import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard, Skeleton } from "../components/index";
import toast from "react-hot-toast";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavoritePosts = () => {
  const [allFavoritePosts, setAllFavoritePosts] = useState([]);
  const skeletonArray = Array(8).fill("");
  const [loading, setLoading] = useState(true);
  const [wantRerender, setWantRerender] = useState(0);
  const userData = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.allPosts);

  useEffect(() => {
    (async () => {
      try {
        const favoritePosts = await postService.getAllFavoritePosts([Query.equal("userId", `${userData.$id}`)]);
        if (favoritePosts && allPosts) {
          let posts = [];
          for (let i = 0; i < allPosts.length; i++) {
            for (let j = 0; j < favoritePosts.documents.length; j++) {
              if (allPosts[i].$id === favoritePosts.documents[j].postId) {
                posts.push(allPosts[i]);
            }
          }
        }
        setAllFavoritePosts(posts);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
    })();
  }, [wantRerender]);


  return (
    <div className="w-full py-8">
      <Container>
        {allFavoritePosts.length === 0 && !loading &&
          <div className="flex w-full h-[80vh] text-lg justify-center items-center">Not favorited any post <Link to={"/"} className="text-blue-500 ml-2">Add to favorite ❤️</Link></div>
        }
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