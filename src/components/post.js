import React from 'react'
import { Link } from "react-router-dom";
import format from 'date-fns/format'

const Post = ({ post }) => {
  return (
    <Link to={`post/${post.id}`} className='md:w-1/3 w-1/2 p-2 float-left'>
      <article className='rounded-lg overflow-hidden relative post cursor-pointer hover:shadow-xl transition-all ease-out'>
        <img src="/images/placeholder-img.jpg" className='w-full' />
        <div className='absolute bottom-0 left-0 w-full p-2 space-y-2 bg-black bg-opacity-10 backdrop-blur-lg text-white post-hover:text-black'>
          <h3 className='font-semibold md:text-lg text-sm'>{post.title}</h3>
          <p className='md:text-sm text-xs truncate'>{post.summary}</p>
          <div className='flex items-center space-x-2 border-t pt-2'>
            <img src={post.author.avatar} className="md:w-8 w-6" />
            <div className='md:text-sm text-xs'>
              <p className='font-bold'>{post.author.name}</p>
              <p className='text-gray-200'>{format(new Date(post.publishDate), 'dd/MM/yyyy')}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default React.memo(Post)