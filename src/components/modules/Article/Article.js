import { MdOutlineSms } from "react-icons/md";
import styles from "./Article.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
function Article() {
  return (
    <div className={styles.article_container}>
      <Link href="/article/123" className={styles.image_container}>
        <img
          src="https://set-coffee.com/wp-content/uploads/elementor/thumbs/-%D9%82%D9%87%D9%88%D9%87-%D8%A8%D8%A7-%D8%B4%DB%8C%D8%B1-qi8xuncj4ordgstrl43mbg5jfj1ezzamf6v9rnitn0.jpg"
          alt=""
        />
      </Link>
      <img />
      <div className={styles.date}>
        <span>24</span>
        <span>jun</span>
      </div>
      <div className={styles.details}>
        <span className={styles.tag}>Coffee</span>
        <Link href="/" className={styles.title}>
          Drinking Coffee with Milk to Reduce Inflammation
        </Link>
        <div>
          <p>Author</p>
           <img
            src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g"
            alt=""
          /> 
          <p>Ghasemi</p>
          <div className={styles.comment}>
            <MdOutlineSms />
            <span>0</span>
          </div>
          <div className={styles.share}>
            <IoShareSocialOutline />
            <div className={styles.tooltip}>
              <Link href={"/"}>
                <FaTelegram />
              </Link>
              <Link href={"/"}>
                <FaLinkedinIn />
              </Link>
              <Link href={"/"}>
                <FaPinterest />
              </Link>
              <Link href={"/"}>
                <FaTwitter />
              </Link>
              <Link href={"/"}>
                <FaFacebookF />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
