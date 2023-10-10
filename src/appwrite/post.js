/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
import config from "../config/config";
import { Client, Databases, Storage, Query } from "appwrite";

export class PostService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionArticlesId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                });
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionArticlesId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                });
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionArticlesId,
                slug
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionArticlesId,
                slug
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionArticlesId,
                queries
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async addToFavorite({ postId, userId }) {
        try {
            let dbDocument = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionFavoriteArticlesId,
                postId
            );
            if (dbDocument) {
                await this.databases.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionFavoriteArticlesId,
                    postId
                );
                return { addedToFav: false };
            }
        } catch (error) {
            if (error.message === "Document with the requested ID could not be found.") {
                await this.databases.createDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionFavoriteArticlesId,
                    postId,
                    {
                        userId,
                        postId
                    }
                );
                return { addedToFav: true };
            }
            return false;
        }
    }

    async getAllFavoritePosts(queries = [Query.equal("userId", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionFavoriteArticlesId,
                queries
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

const postService = new PostService();

export default postService;