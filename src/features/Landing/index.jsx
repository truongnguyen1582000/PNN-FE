import React, { useEffect } from 'react';
import '../../assets/styles/Landing.css';
import logo from '../../assets/imgs/logo.png';
import pic1 from '../../assets/imgs/pic1.webp';
import pic2 from '../../assets/imgs/pic2.webp';
import pic3 from '../../assets/imgs/pic3.webp';
import pic4 from '../../assets/imgs/pic4.webp';
import pic5 from '../../assets/imgs/pic5.png';
import pic6 from '../../assets/imgs/pic6.webp';
import Login from '../Auth/Pages/Login/inedx';
import { clearCart } from '../Cart/CartSlice';
import { useDispatch } from 'react-redux';

function Landing(props) {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(clearCart());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="landing">
      <img src={logo} alt="" width={200} className="landing-nav" />
      <figure className="position-absolute r-0 b-0 l-0 m-0">
        <svg
          preserveAspectRatio="none"
          className="svg"
          x="0px"
          y="0px"
          width="100%"
          height="85px"
        >
          <path
            className="wave-9-bottom-0 fill-white"
            opacity="0.3"
            d="M0,107.7V69.8c0,0,451-54.7,960-5.4S1920,0,1920,0v107.7H0z"
          ></path>
          <path
            className="wave-9-bottom-1 fill-white"
            opacity="0.3"
            d="M0,107.7v-81c0,0,316.2-8.9,646.1,54.5s794.7-114.1,1273.9-38v64.5H0z"
          ></path>
        </svg>
      </figure>
      <ul className="pic-bottom">
        <li>
          <img src={pic1} width="80" alt="" />
        </li>
        <li>
          <img src={pic2} width="80" alt="" />
        </li>
        <li>
          <img src={pic3} width="80" alt="" />
        </li>
        <li>
          <img src={pic4} width="80" alt="" />
        </li>
        <li>
          <img src={pic5} width="80" alt="" />
        </li>
        <li>
          <img src={pic6} width="80" alt="" />
        </li>
      </ul>
      <Login />
    </div>
  );
}

export default Landing;
