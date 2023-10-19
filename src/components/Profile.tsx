import Image from 'next/image'

import { getUser } from '@/lib/auth'

export default function Profile(): React.ReactElement<null> {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-300 hover:text-red-200">
          Quero sair
        </a>
      </p>
    </div>
  )
}
