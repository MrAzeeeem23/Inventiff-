import { ID, Databases, Client} from "appwrite"
import dotenv from 'dotenv'


dotenv.config()

export class BlogService {
  clinet = new Client();
  database;

  constructor() {
    this.clinet
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    this.database = new Databases(this.clinet);
  }

  // Blogs
  async getBlogById(slug) {
    try {
        const currentPost = await this.database.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_URI,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
          slug
        )

        return currentPost;
    } catch (error) {
        console.log("Appwrite getPost service error", error)
        return false
    }
  }

  async getBlog() {
    try {
      return await this.database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_URI,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        []
      );
    } catch (error) {
      console.log("Appwrite getPosts error", error);
      return false;
    }
  }


  // Service

  async getService() {
    try {
      return await this.database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_URI,
        process.env.NEXT_PUBLIC_APPWRITE_SERVICE_COLLECTION_ID,
        []
      )
    } catch (error) {
      console.log("Appwrite getService error", error)
      return false;
    }
  }

  async getServiceById(slug) {
    try {
      const currentService = await this.database.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_URI,
        process.env.NEXT_PUBLIC_APPWRITE_SERVICE_COLLECTION_ID,
        slug
      );
      return currentService;
    } catch (error) {
      console.log("Appwrite getService error", error);
      return false;
    }
  }


  // Products
  async getProductDetails() {
    try{
      const response = await this.database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_URI,
        process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID,
        []
      );
      return response;
    } catch (error) {
      console.log("Apperite getProductDetails error", error)
      return false;
    }
  }
}

const blogService = new BlogService()

export default blogService;