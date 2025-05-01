import { ID, Databases, Client} from "appwrite"
import dotenv from 'dotenv'

dotenv.config()

export class BlogService {
  clinet = new Client();
  database;

  constructor() {
    this.clinet
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67f622ea000b9c66cc72");

    this.database = new Databases(this.clinet);
  }

  async getBlogById(slug) {
    try {
        const currentPost = await this.database.getDocument(
            "67f6231300205660d8a5",
            "67f623250002f05741f1",
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
        "67f6231300205660d8a5",
        "67f623250002f05741f1",
        []
      );
    } catch (error) {
      console.log("Appwrite getPosts error", error);
      return false;
    }
  }
}

const blogService = new BlogService()

export default blogService;