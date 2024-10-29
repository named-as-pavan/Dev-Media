import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useShowToast from './useShowToast'
import { selectedConversationAtom } from '../atom/messagesAtom'
import { useRecoilState } from 'recoil'

const useGetUserProfile = () => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const {username} = useParams()
    const showToast = useShowToast();


     // making selectedconversation null if user visits profile
    const [selectedConversation, setSelectedConversation] = useRecoilState(
      selectedConversationAtom
    );


    useEffect(()=>{


        const getUser = async () => {
          
          try {
              setLoading(true)
              const res = await fetch(`/api/users/profile/${username}`)

              if (!res.ok) {
                throw new Error('Failed to fetch user profile');
            }
    
              const data = await res.json()
              await setUser(data)
              
              
              if(data.error){
                showToast("Error",data.error,'error')
              }
              if(data.isFrozen){
                setUser(null)
                return
              }
              setUser(data)
              setSelectedConversation('')
      
            } catch (error) {
              showToast("Error",error.message,'error')
              
            }
            finally{
              setLoading(false)
            }
          }

          getUser();

    },[username,showToast])

    return { loading , user}
}

export default useGetUserProfile