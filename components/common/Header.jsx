import { UserStatus, logout, selectUserStatus, selectUserUsername } from '@app/userSlice';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import AuthModalContent from '@components/pages/home/AuthModalContent';
import { useMemo, useState } from 'react';
import ShareVideoModalContent from '@components/pages/home/ShareVideoModalContent';
import { initShare } from '@app/shareSlice';

export default function Header() {
  const userStatus = useSelector(selectUserStatus);
  const dispath = useDispatch();

  const userName = useSelector(selectUserUsername);

  const [showAuth, setShowAuth] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <Modal isShow={showAuth} setShow={setShowAuth} title="Auth">
        <AuthModalContent />
      </Modal>
      <Modal isShow={showShare} setShow={setShowShare} title="Share Video">
        <ShareVideoModalContent />
      </Modal>
      <header className="max-w-[1440px] mx-auto rounded-b-xl flex items-center justify-between px-6 py-4 relative">
        <Link href="/">
          <a className="flex items-center space-x-4 col-span-1">
            <Image src="/logo.png" height={50} width={50} layout="intrinsic" alt='logo' />
            <div>
              <h1 className="text-2xl font-bold hidden md:flex">Funny Movies</h1>
            </div>
          </a>
        </Link>
        {
          userStatus == UserStatus.NO_LOGIN &&
          <button className=' bg-indigo-500 rounded-sm px-2 py-1 w-min'
            onClick={() => setShowAuth(true)}
          >
            Login/register
          </button>
        }
        {
          userStatus == UserStatus.LOGGED &&
          <div className='flex flex-row justify-end items-center'>
            <span className=''>Welcome <span className='font-bold'>{userName}</span></span>
            <button className='bg-indigo-500 rounded-sm px-2 py-1 ml-3'
              onClick={() => setShowShare(true)}
            >
              Share a moive
            </button>
            <button className=' bg-amber-500 rounded-sm px-2 py-1 ml-3'
              onClick={() => dispath(logout())}
            >
              Logout
            </button>
          </div>
        }
      </header>

    </>
  )
}
