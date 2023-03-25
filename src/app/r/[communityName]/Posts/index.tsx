'use client'
import { db } from '@/firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Community, Post } from '../../../../../types'
import PostItem from './PostItem'
import usePosts from '@/hooks/usePosts'
import PostsLoader from './PostsLoader'
import { useAtomValue } from 'jotai'
import { communityStateAtom } from '@/atoms/communityDataState'

interface Props {
  community: Community
}
const Posts = ({ community }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])

  const { postDataState, setPostDataState } = usePosts()
  const [loading, setLoading] = useState(false)
  const { currentCommunity } = useAtomValue(communityStateAtom)

  const q = query(
    collection(db, 'posts'),
    where('communityName', '==', community.communityName),
    orderBy('createdAt', 'desc')
  )

  // fetch posts to state, then retritive them

  // const fetchPosts = async () => {
  //   const postDocs =
  // }

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const postDocs = await getDocs(q)

      setPostDataState(prev => ({
        ...prev,
        posts: postDocs.docs.map(
          doc =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Post)
        ),
      }))
    } catch (error) {
      console.log('fetchPosts', error)
    }
    setLoading(false)
  }

  console.log('communityName', community.communityName)
  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community.communityName, currentCommunity?.communityName])

  console.log('posts', community.communityName)
  // useEffect(
  //   () =>
  //     onSnapshot(q, snapshot => {
  //       setPosts(
  //         snapshot.docs.map(
  //           doc =>
  //             ({
  //               id: doc.id,
  //               ...doc.data(),
  //             } as Post)
  //         )
  //       )
  //     }),
  //   [q]
  // )

  console.log('posts', posts)

  return (
    <>
      {loading ? (
        <PostsLoader />
      ) : (
        <div className="">
          {postDataState.posts.map(post => (
            <PostItem
              post={post}
              key={post.id}
              communityName={community.communityName}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Posts
