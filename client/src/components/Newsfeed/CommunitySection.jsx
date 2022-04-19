import './CommunitySection.css'
import {Link} from "react-router-dom";
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import logo from './media/mobi-logo.jpg'

const CommunitySection = () => {
    // const community = [
    //     {
    //         id: 1,
    //         img: "badminton-club-logo",
    //         title: "Badminton Club"
    //     },
    //     {
    //         id: 2,
    //         img: "fintech-club-logo",
    //         title: "Fintech Club"
    //     },
    //     {
    //         id: 3,
    //         img: "mass-media-club-logo",
    //         title: "Mass Media Club"
    //     },
    //     {
    //         id: 4,
    //         img: 'mobi-logo',
    //         title: "Global Experience"
    //     }
    // ]

    return (
       <div className="community-container">
           <h1 className="title">Community</h1>
           <div className="create-community">
                <Link to="/community-request"><span className='create-icon'>
                    {/*CHANGE ICON FOR ME*/}
                    <IconContext.Provider value={{ color: '#C0BFBF', size: '2em' }}>
                        <BsFillChatDotsFill />
                    </IconContext.Provider>
                </span>
                </Link>
                <Link to="/community-request" className='link'><p>Create community</p></Link>
           </div>
           <div className='joined-community'>
            {/* {community.map(element => (
                <span className='community' key={element.id}>
                    <Link to='/'> <img src={require('./media/' + community.img + '.jpg')} alt="Community logo" className={community.title}/></Link>
                </span> 
            ))} */}
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