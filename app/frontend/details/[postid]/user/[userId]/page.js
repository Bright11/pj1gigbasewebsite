import React from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../../componets/config/firebaseConfig';
import PostDetails from "../../../detalspost/PostDetails"

// seo
export async function generateMetadata(props) {
  const params = await props.params;
  const { postid, userId } = params;
  const docRef = doc(db, "post", postid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const title = data.title;
    const description = data.description;
    const image = data.image;
    const location = data.location;
    const catId = data.catId;
    const user = data.user;
    const phone = data.phone;
    const email = data.email;
    const date = data.date;

    return {
      title: `${title} - Book Now in ${location}`,
      description: description || `Discover more about ${title}, available in ${location} for more information. Contact ${user} (${phone}, ${email}) for details.`,
      openGraph: {
        title: title,
        description: description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `Image of ${title}`,
          },
        ],
        url: `https://example.com/post/${postid}`,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        image: image,
      },
      alternates: {
        canonical: `https://example.com/post/${postid}`,
      },
      metadataBase: "https://example.com",
    };
  } else {
    return {
      title: "Post not found",
      description: "The requested post could not be found.",
    };
  }
}


// the end
export default async function DetailsPage(props) {
  const params = await props.params;
  const { postid, userId } = params;
  return (
   <PostDetails params={params}/>
  )
}
