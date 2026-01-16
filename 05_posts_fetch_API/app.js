//    async function getRecentPost() {
//             console.log("before");
            
//             const response = await   fetch("https://jsonplaceholder.typicode.com/posts/1")
//             const data = await response.json();
//             console.log(data);
//             console.log("done!!");
//             document.getElementById('posts').innerHTML=data.body;
//         }
//         getRecentPost();


 async function fetchPosts() {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      document.getElementById("posts").innerHTML = res.data.title;
    }

    fetchPosts();