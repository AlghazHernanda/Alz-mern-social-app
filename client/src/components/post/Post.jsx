import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length); // Jumlah like untuk postingan
  const [isLiked, setIsLiked] = useState(false); // Menandai apakah pengguna sudah menyukai postingan
  const [user, setUser] = useState({}); // Informasi pengguna yang membuat postingan
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //// Path ke folder public
  const { user: currentUser } = useContext(AuthContext); //// Mengambil informasi pengguna yang sedang masuk

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id)); // Mengatur status apakah pengguna telah menyukai postingan ini
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`); // Mengambil informasi pengguna yang membuat postingan
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id }); // Mengirim permintaan ke server untuk menyukai atau tidak menyukai postingan
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1); // Mengupdate jumlah like sesuai dengan aksi pengguna
    setIsLiked(!isLiked); // Mengubah status isLiked
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
