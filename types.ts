import { Timestamp } from 'firebase/firestore'

export interface Community {
  communityName: string
  createdAt: Timestamp
  communityImage?: string
  numberOfMembers: number
  creatorId: string
  privacyType: 'public' | 'restricted' | 'private'
}

export interface CommunityData {
  communityName: string
  isModerator?: boolean
  communityImage?: string
}
export interface Post {
  id: string
  title: string
  body: string
  creatorId: string
  postImage?: string
  createdAt: Timestamp
  communityName: string
  numberOfComments: number
  numberOfVotes: number
  creatorName: string
  communityImage?: string
}

export interface Comment {
  id: string
  text: string
  createdAt: Timestamp
  creatorId: string
  creatorAvator: string
  creatorName: string
  parentId: string
  postId: string
}
