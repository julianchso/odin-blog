import React, { useEffect, useState } from 'react';

type Post = {
  message: string;
  data: Post[];
};

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = 'http://localhost:3000/api/posts';
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(res);
        const json = await res.json();

        setAllPosts(json.data);
      } catch (err) {
        console.error('Fetch error: ', err);
      }
    }

    fetchPosts();
  }, []);

  console.log(allPosts);

  // useEffect(() => {
  //   console.log(allPosts);
  //   const filtered = allPosts.filter((post) =>
  //     post.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredPosts(filtered);
  // }, [searchTerm, allPosts]);

  // TODO: fetch post titles from server

  return (
    <>
      <input
        type='text'
        placeholder='Search title...'
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </>
  );
}

export default SearchBar;
