import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);  // State untuk menyimpan daftar postingan
  const { user } = useContext(AuthContext);  // Mengambil informasi pengguna dari konteks autentikasi

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);

       // Mengatur daftar postingan dan mengurutkannya berdasarkan tanggal pembuatan
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts(); // Memanggil fungsi untuk mengambil postingan saat komponen dimuat
  }, [username, user._id]); // Efek akan dipicu ketika username atau user._id berubah

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
