import "./MemberSection.css";
import {Link} from "react-router-dom";
import {BsFillChatDotsFill} from "react-icons/bs";
import {IconContext} from "react-icons/lib";

const MemberSection = () => {
    
    const Members = [
        {
        id: 1,
        username: "Apple Pie",
        },
        {
        id: 2,
        username: "Bumble Bee",
        },
        {
        id: 3,
        username: "Cathy Doll",
        },
        {
        id: 4,
        username: "Ducky Duck",
        },
    ];

  return (
    <div className='member-container'>
      <h1 className='title'>Members</h1>
      {/*I WILL USE MAP LATER*/}
      <div className="member-list">
        {Members.map((element) => (
          <div key={element.id} className='member'>
            <Link to='/profile'>
              <span className='user-icon'>
                {/*CHANGE ICON FOR ME*/}
                <IconContext.Provider value={{color: "#676767", size: "1em"}}>
                  <BsFillChatDotsFill />
                </IconContext.Provider>
              </span>
            </Link>
            <Link to='/profile' className='link'>
              <p>{element.username}</p>
            </Link>
          </div>
        ))}

      </div>
      
    </div>
  );
};

export default MemberSection;
