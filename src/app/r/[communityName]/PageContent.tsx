import BackToTopButton from '@/app/BackToTopButton'
import React, { useEffect, useState } from 'react'

const PageContent = ({ children }: { children: React.ReactNode[] }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        setShow(true)
      } else {
        setShow(false)
      }

    })

  }, [])
  return (
    <div className="flex justify-center pt-4">
      <div className="flex w-[95%] max-w-[860px]">
        {/* left hand */}
        <div className="flex flex-col w-[100%] md:w-[65%]">{children[0]}</div>
        {/* right hand */}
        <div className="flex-col flex-1 hidden ml-6 rounded-lg md:flex md:w-[35%]">
          {children[1]}
        </div>
        {show && <BackToTopButton />}
      </div>
    </div>
  )
}

export default PageContent
