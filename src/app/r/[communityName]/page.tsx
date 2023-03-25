'use client'
import useCommunityData from '@/hooks/useCommunityData'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { Community } from '../../../../types'
import About from './About'
import CreatePostLink from './CreatePostLink'
import Header from './Header'
import PageContent from './PageContent'
import Posts from './Posts'

const CommunityPage = ({ params }: { params: { communityName: string } }) => {
  const {
    communityState,
    currentCommunityLoading,
    pageExists,
    setCommunityState,
  } = useCommunityData()

  useEffect(() => {
    setCommunityState(prev => ({
      ...prev,
      currentCommunity: {
        ...prev.currentCommunity,
        communityName: params.communityName,
      } as Community,
    }))
  }, [params.communityName, setCommunityState])

  if (!pageExists) notFound()
  if (!communityState.currentCommunity?.creatorId) return <p>loading</p>
  return (
    <>
      {communityState.currentCommunity && (
        <>
          <Header community={communityState.currentCommunity} />
          <PageContent>
            <>
              {/* Create Post Link*/}
              <CreatePostLink communityName={params.communityName} />
              {/* Posts */}
              <Posts />
            </>
            <>
              {/* About */}
              <About community={communityState.currentCommunity} />
            </>
          </PageContent>
        </>
      )}
    </>
  )
}

export default CommunityPage
