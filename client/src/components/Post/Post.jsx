import "./Post.css";
import {BsFillChatDotsFill} from "react-icons/bs";
import {IconContext} from "react-icons/lib";
import {Link} from "react-router-dom";

const Post = () => {
  return (
    <div className='post-container'>
      <div className='vote-container'>
        <span className='upvote-icon'>
          {/*CHANGE ICONS FOR ME */}
          <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
            <BsFillChatDotsFill />
          </IconContext.Provider>
        </span>
        <p>1000</p>
        <span className='downvote-icon'>
          {/*CHANGE ICONS FOR ME */}
          <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
            <BsFillChatDotsFill />
          </IconContext.Provider>
        </span>
      </div>

      <div className='content-container'>
        <div className='content-section-header'>
          {/*CHANGE ICONS FOR ME */}
          <span className="users-icon">
            <label htmlFor='username'>
              <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
                <BsFillChatDotsFill />
              </IconContext.Provider>
            </label>
          </span>

          <p id='username' className='username'>
            Username
          </p>
          <p className='uploaded-time'>Posted 1 hour ago</p>
        </div>

        <div className='post-content'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            sollicitudin dictum nulla eu hendrerit. Donec commodo fringilla
            sollicitudin. Duis sit amet ligula quis tellus scelerisque pulvinar
            ut vitae ligula. Phasellus lectus felis, convallis sit amet
            consequat quis, interdum eu lectus. Suspendisse potenti. Maecenas at
            pulvinar lorem. Proin at tellus viverra, lacinia massa nec, rhoncus
            ligula.
          </p>
        </div>
        <div className='content-section-footer'>
          <span className='icon'>
            <Link to='/comment'>
              <label htmlFor='comment'>
                <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
                  <BsFillChatDotsFill />
                </IconContext.Provider>
              </label>
            </Link>
            <p id='comment' className='icon-label'>
             
              Comments
            </p>
          </span>

          <span className='icon'>
            <Link to='/'>
              <label htmlFor='report'>
                <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
                  <BsFillChatDotsFill />
                </IconContext.Provider>
              </label>
            </Link>
            <p id='report' className='icon-label'>
              Report
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
