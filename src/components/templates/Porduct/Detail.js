import React from 'react'
import Breadcrumb from './Breadcrumb'
import styles from './Detail.module.css'
import { FaFacebookF, FaStar, FaTwitter ,FaRegStar} from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import AddToWishlist from './AddToWishlist';
function Detail({productData}) {
  const acceptedComments = productData.comments.filter(
    (comment) => comment.isAccept
  ).length;
  return (
    <div>
      <Breadcrumb route={productData.name} />
      <div className={styles.container}>
        <h1 className={styles.title}>
          {productData.name}
        </h1>
        <div className={styles.rating}>
          {new Array(productData.score).fill(0).map((item,index)=><FaStar key={index} />)}
         {new Array(5-productData.score).fill(0).map((item,index)=><FaRegStar key={index} />)}
          <p>({acceptedComments} Reviews)</p>
        </div>
        <div className={styles.prices}>
          <p>{productData.price.toLocaleString("en-US")}$</p>
        </div>
        <p className={styles.description}>
        {productData.shortDescription}
        </p>
        <hr />
        <div className={styles.stock}>
          <IoCheckmark />
          <p>In Stock</p>
        </div>
        <div className={styles.cart}>
          <div className={styles.quantity}>
            <span>+</span>
            <span>1</span>
            <span>-</span>
          </div>
          <button>Add to Cart</button>
        </div>
        <div className={styles.wishlist}>
          <AddToWishlist product={productData._id}/>
          <div>
            <TbSwitch3 />
            <span>Compare</span>
          </div>
        </div>
        <hr />
        <div className={styles.details}>
          <strong>Product ID: GOLD Nespresso Compatible Capsule</strong>
          <p>
            <strong>Tags:</strong> {
              productData.tags.map((tag) => tag).join(", ")
            }
          </p>
        </div>

        <div className={styles.share}>
          <p>Share:</p>
          <a href="/">
            <FaTelegram />
          </a>
          <a href="/">
            <FaLinkedinIn />
          </a>
          <a href="/">
            <FaPinterest />
          </a>
          <a href="/">
            <FaTwitter />
          </a>
          <a href="/">
            <FaFacebookF />
          </a>
        </div>

        <hr />
      </div>
    </div>
  );
}

export default Detail