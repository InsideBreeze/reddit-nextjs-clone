'use client'
import { useRedditStore } from '@/app/store'
import useJoinedCommunities from '@/hooks/useJoinedCommunities'
import Spinner from '@/utils/Spinner'
import Image from 'next/image'
import { BsReddit } from 'react-icons/bs'
import { Community } from '../../../../types'
interface Props {
  community: Community
}
const Header = ({ community }: Props) => {
  const { joinedCommunities, loading, joinOrLeaveCommunity } =
    useJoinedCommunities()

  const isJoined =
    !!joinedCommunities &&
    !!joinedCommunities.find(c => c.communityName === community.communityName)

  const curr = useRedditStore((state: any) => state.currentCommunity)
  return (
    <div className="h-[146px]">
      <p className="bg-blue-500 h-[50%]" />
      <div className="h-[50%] bg-white">
        <div className="w-[95%] max-w-[860px] mx-auto">
          <div className="flex">
            {curr.communityImage ? (
              <Image
                height={100}
                width={100}
                alt=""
                src={curr.communityImage}
                className="w-[64px] h-[64px] rounded-full -top-3 relative shadow-xl"
                priority
              />
            ) : (
              <BsReddit className="text-[64px] text-brand-100 relative -top-3 rounded-[50%] border-4 border-white" />
            )}
            <div className="flex py-[10px] px-3 space-x-4">
              <div>
                <p className="text-lg font-semibold">
                  {community.communityName}
                </p>
                <p className="text-gray-600 font-sm">
                  r/{community.communityName}
                </p>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <button
                  className={`border border-blue-500 h-[28px] px-5 ${
                    isJoined
                      ? 'text-blue-500 bg-white hover:gray-100'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }
              rounded-full font-semibold`}
                  onClick={() => joinOrLeaveCommunity(isJoined, community)}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
