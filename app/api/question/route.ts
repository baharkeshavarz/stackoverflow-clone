// import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/mongo/db";
// eslint-disable-next-line import/no-named-default
import { default as SongSchm } from "@/lib/mongo/models/Song";
// import { Song } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     const url = new URL(request.url)
//     const songId = url.searchParams.get("songId")
  
//     let song: Song;
//     let songData = null;
//     let jsonResponse =  { status: "failed", song: {} };
    
//     if (songId) {
//          await db.connect();
//          songData = await SongSchm.findOne({_id: songId});
       
//          if (!songData) return;
      
//          song = {
//                 id: songData._id,
//                 user_id: songData.user_id,
//                 author: songData.author,
//                 title: songData.title,
//                 song_path: songData.song_path,
//                 image_path: songData.image_path,
//        };

//         jsonResponse = {
//            status: "success",
//            song: song as Song,
//          };
//     }
 
//     return NextResponse.json(jsonResponse);
// } 

export async function POST(request: NextRequest) {
   // const body = await request.json();
    // const {
    //     user_id,
    //     title,
    //     author,
    //     image_path,
    //     song_path,
    // } = body;

    let jsonResponse = { status: "failed"};

    // const user = await getCurrentUser(user_id);
    // if (user?._id) {
        await db.connect();
        const song = new SongSchm();
        song.user_id = "64f84652f0ced2d9e00f80bf";
        song.title = "title";
        song.author = "author";
        song.image_path = "image_path";
        song.song_path = "song_path";
        await song.save(); 
          
        jsonResponse = {
            status: "success",
        };
   // }

    return NextResponse.json(jsonResponse);
  }