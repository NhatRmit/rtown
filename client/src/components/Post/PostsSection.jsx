import "./PostsSection.css";
import {BiUpvote, BiDownvote} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {IconContext} from "react-icons/lib";
import {MdReportGmailerrorred} from "react-icons/md";
import {Link} from "react-router-dom";

const PostsSection = () => {
  return (
    <div className='post-container'>
      <div className='vote-container'>
        <span className='upvote-icon'>
          {/*CHANGE ICONS FOR ME */}
          <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
            <BiUpvote />
          </IconContext.Provider>
        </span>
        <p>1000</p>
        <span className='downvote-icon'>
          {/*CHANGE ICONS FOR ME */}
          <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
            <BiDownvote />
          </IconContext.Provider>
        </span>
      </div>

      <div className='content-container'>
        <div className='content-section-header'>
          {/*CHANGE ICONS FOR ME */}
          <span className='users-icon'>
            <label htmlFor='username'>
              <IconContext.Provider value={{color: "#676767", size: "1.5em"}}>
                <FaUserCircle />
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
          <div className='content-left-footer'>
            {/*Report icon*/}
            <span className='icon'>
              <Link to='/'>
                <label htmlFor='report'>
                  <IconContext.Provider
                    value={{color: "#676767", size: "1.5em"}}>
                    <MdReportGmailerrorred />
                  </IconContext.Provider>
                </label>
              </Link>
              <p id='report' className='icon-label'>
                Report
              </p>
            </span>
          </div>

          <div className='content-right-footer'>
            {/*Edit post icon*/}
            <span className='icon'>
              <Link to='/'>
                <label htmlFor='edit-post'>
                  <IconContext.Provider
                    value={{color: "#676767", size: "1.5em"}}>
                    <AiFillEdit />
                  </IconContext.Provider>
                </label>
              </Link>
              <p id='edit-post' className='icon-label'>
                Edit
              </p>
            </span>

            {/*Delete post icon*/}
            <span className='icon'>
              <Link to='/'>
                <label htmlFor='delete-post'>
                  <IconContext.Provider
                    value={{color: "#676767", size: "1.5em"}}>
                    <AiFillDelete />
                  </IconContext.Provider>
                </label>
              </Link>
              <p id='delete-post' className='icon-label'>
                Delete
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsSection;
