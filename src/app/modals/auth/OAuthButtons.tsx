import { userLocalAtom } from '@/atoms/userLocalState'
import { auth, db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const OAuthButtons = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth)

  const setUserLocalState = useSetAtom(userLocalAtom)
  const onSignIn = async () => {
    const userCred = await signInWithGoogle()
    if (userCred) {
      await setDoc(
        doc(db, `users/${userCred.user.uid}`),
        JSON.parse(JSON.stringify(userCred.user))
      )
      setUserLocalState(userCred.user)
    }
  }

  return (
    <div className="flex flex-col items-center mt-2 mb-4 space-y-3">
      <p
        className="flex justify-center w-full py-2 space-x-4 text-center border rounded-full cursor-pointer hover:bg-gray-100"
        onClick={onSignIn}
      >
        <Image
          src="/images/GOOG.svg"
          height="0"
          width="0"
          alt="google"
          className="w-[23px] h-[23px] object-contain"
        />
        <span>Continue with Google</span>
      </p>
      <p className="flex justify-center w-full py-2 space-x-4 text-center border rounded-full cursor-pointer hover:bg-gray-100">
        Some other providers
      </p>

      <p className="font-bold text-gray-400">OR</p>
    </div>
  )
}

export default OAuthButtons
