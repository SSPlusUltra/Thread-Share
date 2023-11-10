import React, { useState, useRef, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import LogoS from '../logo3.jpg'
import SignOut from './sign-out';
import Pfp from './pfp';
import Threadlogo from '../logo3.jpg'
import { auth, storage } from '../firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
const Navbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);


  const [pfp, setpfp] = useState(Threadlogo)

  const [prof, setprof] = useState(false)
 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  props.onc(showDropdown);
  useEffect(() => {
    // Event listener to close the dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) ) {
        setShowDropdown(false);
     
      }
      if(dropdownRef2.current && !dropdownRef2.current.contains(event.target)){
        setprof(false)
      }
  
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  


  const imageRef = ref(storage, `${auth.currentUser.uid}/` )
  useEffect(()=>{
    listAll(imageRef).then((res)=>{
      console.log(res)
      res.items.forEach(element => {
        getDownloadURL(element).then((url)=>{
            setpfp(url)
        })
        
      });
    })
  }, [auth.currentUser.uid])
  

  

  return (
    <nav className="navbar" >
     <div className="logo">
  <Link to='/homepage'>
    <img src={LogoS} className= "reddit-icon"style={{ width: '60px', height: '60px', margin:'2px 0px 1px' }}/>
  </Link>
</div>
<div className='logo-text'>
  <h3>ThreadShare</h3>
</div>
<div className="nav-links">
        <div className="subreddit-dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="nav-link subreddits-button">Subreddits</button> {/* Add the subreddits-button class */}
          {showDropdown && (
            <div className="dropdown-content">
             <Link to="/form" className="create-subreddit-btn">
      + Create New Subreddit
    </Link>
              {props.formD.map((item) => (
                <Link onClick={toggleDropdown} to={{
                  pathname: '/subredditpage',
                  search: `?title=${encodeURIComponent(item.title)}`,
                }}  key={item.id} href="#" className="dropdown-link">{item.title}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div ref={dropdownRef2}  className='hu'>
      <div  onClick={()=>{
        setprof(!prof)
      }} className='profile-con' >
   <img src={pfp} alt="Logo" className="rounded" />
      <div className='pf'>{auth.currentUser.displayName}</div>
      <span className='caret-down'><FontAwesomeIcon icon={faCaretDown} /></span>
      </div>
      {prof && <div className='dugh'>
        <Link onClick={()=>{
        setprof(!prof)
      }} to='/profile' className='p'>Profile</Link>
        <Link onClick={()=>{
        setprof(!prof)
      }} to='/joinedsubs' className='m'>My Communities</Link>
        <Link onClick={()=>{
        setprof(!prof)
      }} to='/savedposts' className='s'>Saved Posts</Link>

      </div>}
      </div>
   
<SignOut/>
    </nav>
  );
};

export default Navbar;
