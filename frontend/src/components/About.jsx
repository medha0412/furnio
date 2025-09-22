import React from 'react';
import BackButton from './BackButton';

const About = () => {
  const posts = [
    {
      id: 1,
      title: 'Going all-in with millennial design',
      author: 'Admin',
      date: '14 Oct 2022',
      category: 'Wood',
      image: '/images/Rectangle 68.png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.',
    },
    {
      id: 2,
      title: 'Exploring new ways of decorating',
      author: 'Admin',
      date: '14 Oct 2022',
      category: 'Handmade',
      image: '/images/Rectangle 68 (1).png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.',
    },
    {
      id: 3,
      title: 'Handmade pieces that took time to make',
      author: 'Admin',
      date: '14 Oct 2022',
      category: 'Wood',
      image: '/images/Rectangle 68 (2).png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.',
    },
    {
      id: 4,
      title: 'Modern home in Milan',
      author: 'Admin',
      date: '08 Aug 2022',
      category: 'Design',
      image: '/images/Rectangle 68.png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.',
    },
    {
      id: 5,
      title: 'Colorful office redesign',
      author: 'Admin',
      date: '03 Aug 2022',
      category: 'Design',
      image: '/images/Rectangle 68 (1).png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.',
    },
  ];

  const categories = [
    { name: 'Crafts', count: 2 },
    { name: 'Design', count: 8 },
    { name: 'Handmade', count: 7 },
    { name: 'Interior', count: 1 },
    { name: 'Wood', count: 6 },
  ];

  return (
    <div className="font-sans min-h-screen">
      <BackButton />
      {/* Header section */}
      <div className="relative h-[300px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Group 78 (4).png')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white">
          <div className="flex justify-center mb-4">
           
          </div>
          
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Blog Posts Section */}
        <div className="lg:col-span-2 space-y-12">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id}>
              <img src={post.image} alt={post.title} className="w-full rounded-lg mb-6" />
              <div className="flex items-center text-gray-500 text-sm space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01M5 11h.01M5 15h.01M5 19h.01M19 11h.01M19 15h.01M19 19h.01M18 11a1 1 0 00-1-1H7a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V11z" /></svg>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7l-4 4m0 0l4 4m-4-4h16" /></svg>
                  <span>{post.category}</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <a href="#" className="text-gray-900 font-medium border-b border-gray-900">Read more</a>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center space-x-4">
            <button className="bg-yellow-600 text-white font-semibold py-3 px-5 rounded-md">1</button>
            <button className="bg-[#fcf8f3] text-gray-900 font-semibold py-3 px-5 rounded-md">2</button>
            <button className="bg-[#fcf8f3] text-gray-900 font-semibold py-3 px-5 rounded-md">3</button>
            <button className="bg-[#fcf8f3] text-gray-900 font-semibold py-3 px-5 rounded-md">Next</button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>

          {/* Categories */}
          <div className="bg-[#fcf8f3] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name} className="flex justify-between items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <a href="#">{category.name}</a>
                  <span>({category.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="bg-[#fcf8f3] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
            <div className="space-y-6">
              {posts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center space-x-4">
                  <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#fcf8f3] py-16 px-4 mt-16 rounded-lg">
        <div className="container mx-auto text-center">
          <img 
            src="/images/Feature.png" 
            alt="Features" 
            className="w-full h-auto max-w-4xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default About;