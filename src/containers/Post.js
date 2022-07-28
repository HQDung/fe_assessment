import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format'

function Post() {
  const { id } = useParams();
  const posts = useSelector(state => state.app.posts);
  const post = posts.find(p => p.id === id);

  if (!post) return <div className='text-4xl text-center font-bold text-gray-500 pt-16'>Not found!</div>

  return (
    <main className='md:flex'>
      <div className='md:w-1/3 p-4'>
        <img src="/images/placeholder-img.jpg" className='w-full rounded-lg' />
      </div>
      <section className='md:pl-8 p-4 space-y-4 md:w-2/3'>
        <h1 className='font-semibold md:text-2xl text-lg'>{post.title}</h1>
        <p className='md:text-base text-sm'>{post.summary}</p>
        <div className='flex items-center space-x-2 border-t pt-2'>
          <img src={post.author.avatar} className="md:w-8 w-6" />
          <div className='md:text-sm text-xs'>
            <p className='font-bold'>{post.author.name}</p>
            <p className='text-gray-400'>{format(new Date(post.publishDate), 'dd/MM/yyyy')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Post