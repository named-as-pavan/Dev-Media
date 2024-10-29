import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import postAtom from '../atom/postAtom';
import useShowToast from './useShowToast';
import developersAtom from '../atom/developersAtom';
import { selectedConversationAtom } from '../atom/messagesAtom';

const useDeveloperPosts = () => {
    const [devLoading, setDevLoading] = useState(true);
    const [developerPosts, setDeveloperPosts] = useRecoilState(developersAtom); // Use developersAtom for developer posts

    const [selectedConversation, setSelectedConversation] = useRecoilState(
        selectedConversationAtom
      );

    const showToast = useShowToast();
    const developer = "pavankumar"; // You may want to make this dynamic

    useEffect(() => {
        const getDeveloperPosts = async () => {
            setDevLoading(true);
            try {
                const res = await fetch(`/api/posts/user/${developer}`);
                const data = await res.json();

                if (data.error) {
                    showToast("Error", "Sorry, some error occurred", "error");
                } else {
                    setDeveloperPosts(data);
                    setSelectedConversation(""); // Set developer posts
                }
            } catch (err) {
                showToast("Error", "An unexpected error occurred", "error");
            } finally {
                setDevLoading(false);
            }
        };

        getDeveloperPosts();
    }, [developer, showToast, setDeveloperPosts]);

    return { developerPosts, devLoading };
};

export default useDeveloperPosts;
