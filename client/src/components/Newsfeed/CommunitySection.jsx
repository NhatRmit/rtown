import './CommunitySection.css'
import {Link} from "react-router-dom";
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import logo from './media/mobi-logo.png'

const CommunitySection = () => {
    const community = [
        {
            id: 1,
            img: "./media/badminton-club-logo.png"
        },
        {
            id: 2,
            img: "./logo.png"
        },
        {
            id: 3,
            img: "./logo.png"
        },
        {
            id: 4,
            img: './logo.png'
        }
    ]

    return (
       <div className="community-container">
           <h1 className="title">Community</h1>
           <div className="create-community">
                <span className='create-icon'>
                    {/*CHANGE ICON FOR ME*/}
                    <IconContext.Provider value={{ color: '#C2C2C2', size: '2em' }}>
                        <BsFillChatDotsFill />
                    </IconContext.Provider>
                </span>
                <p>Create community</p>
           </div>
           <div className='joined-community'>
            <span className='community'>
                <Link to='/'> <img src={logo} alt="Community logo" className="community-logo"/></Link>
            </span> 
            <span className='community'>
                <Link to='/'> <img src={logo} alt="Community logo" className="community-logo"/></Link>
            </span>
            <span className='community'>
                <Link to='/'> <img src={logo} alt="Community logo" className="community-logo"/></Link>
            </span>
            <span className='community'>
                <Link to='/'> <img src={logo} alt="Community logo" className="community-logo"/></Link>
            </span>

           </div>
           
           {/* <div>
                {community.map(element => (
                    <div key={element.id} className="joined-community">
                       <Link to='/'> <img src={element.img} alt="Community logo" className="logo"/></Link>
                    </div>
                ))}
           </div> */}
       </div>
    )
}

export default CommunitySection