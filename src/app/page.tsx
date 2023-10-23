import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import { EmptyMemories } from '@/components'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

dayjs.locale(ptBr)

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) return <EmptyMemories />

  const token = cookies().get('token')?.value

  const Authorization = `Bearer ${token}`
  const response = await api.get<Memory[]>('/memories', {
    headers: { Authorization },
  })

  const memories = response.data
  if (!memories?.length) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((m) => (
        <div key={m.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(m.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>

          <Image
            className="aspect-video w-full rounded-lg object-cover"
            src={m.coverUrl}
            alt=""
            width={592}
            height={280}
          />
          <p className="text-lg leading-relaxed text-gray-100">{m.excerpt}</p>

          <Link
            href={`/memories/${m.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
