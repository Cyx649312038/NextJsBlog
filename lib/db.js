import { MongoClient } from "mongodb";
export async function connectDb() {
    const client = await MongoClient.connect("mongodb+srv://649312038:wpq1GsfleXCXkrhB@cluster0.vxerius.mongodb.net/auth-info?retryWrites=true&w=majority&appName=Cluster0")
    return client
}