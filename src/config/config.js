const config = {
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionArticlesId:String(import.meta.env.VITE_APPWRITE_COLLECTION_Articles_ID),
    appwriteCollectionFavoriteArticlesId:String(import.meta.env.VITE_APPWRITE_COLLECTION_FavoriteArticles_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;