import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postAtom from "../../atom/postAtom";
import SuggestedUsers from "../components/SuggestedUsers";
import useDeveloperPosts from "../../hooks/useDeveloperPosts";


import React from 'react'
import developersAtom from "../../atom/developersAtom";
import { useRecoilValue } from "recoil";

const HomePage = () => {

    const [posts, setPosts] = useRecoilState(postAtom);

    const [developerPosts,setDeveloperPosts] = useRecoilState(developersAtom)

    const {devLoading} = useDeveloperPosts()

    const [loading,setLoading] = useState(true)

    const showToast = useShowToast();
    

    const developer = "pavankumar"; // You may want to make this dynamic

    useEffect(() => {
        const getDeveloperPosts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/posts/user/${developer}`);
                const data = await res.json();
               

                if (data.error) {
                    showToast("Error", "Sorry, some error occurred", "error");
                } else {
                    setDeveloperPosts(data); // Set developer posts
                }
            } catch (err) {
                showToast("Error", "An unexpected error occurred", "error");
            } finally {
                setLoading(false);
            }
        };

        getDeveloperPosts();
    }, [developer, showToast, setDeveloperPosts]);

    




    useEffect(()=>{
        const getFeedPosts = async ()=>{
            setLoading(true)
            setPosts([])
            try {
                const res = await fetch("/api/posts/feed")
                const data = await res.json();
                if(data.error){
                    showToast("Error",data.error,"error")
                    return;
                }
                setPosts(data)
            } catch (error) {
                showToast("Error",error.message,"error")
            }

           finally{
            setLoading(false)
            }
        }

        getFeedPosts();
    },[showToast,setPosts])


    return (
        <>
        <Flex gap='10' alignItems={'flex-start'}  top={'10px'}
          position={'relative'}>

       
        <Box flex={70}>
        {loading && (
            <Flex justifyContent={'center'}
            >
                <Spinner size={'xl'}/>

            </Flex>
        )}

        {!loading && posts.length === 0 &&(
             <h1 style={{textAlign:"center"}}> Follow some users to see  their feed</h1>
            //  add your projects
            )
             }

             {!loading && posts.length === 0 && developerPosts?.map((post) => (
                <Post key={post._id} post={post} postedBy={post.postedBy} />
             ))}

{!devLoading && posts?.map((post) => (
    <Post key={post._id} post={post} postedBy={post.postedBy} />
))}
        </Box>

        <Box flex={30}
        display={{
            base:"none",
           md:"block",
        }}>
            <SuggestedUsers/>
        </Box>
        </Flex>

        </>
    );
};

export default HomePage;
