import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";


const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'



const LoadDB = async ()=>{
  await  ConnectDB();
}

LoadDB();

//Api endpoint to get all blogs


export async function GET(request){
  const blogs = await BlogModel.find({});
    
    return NextResponse.json({blogs})
}

//API Endpoints for uploading blogs 

export async function POST(request){
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer()
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    const blog = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`, // Map to the incorrect field in schema
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      image: `${imgUrl}`,
      authorImg: `${formData.get("authorImg")}`,
  };
  

     await BlogModel.create(blog);

     console.log("Blog Saved" );
    return NextResponse.json({success:true,msg:"Blog Added "})

}