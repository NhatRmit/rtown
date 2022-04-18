import './CommunitySection.css'
import {Link} from "react-router-dom";
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'

const CommunitySection = () => {
    const community = [
        {
            id: 1,
            img: './logo'
        },
        {
            id: 2,
            img: '../../../public/media/logo'
        },
        {
            id: 3,
            img: '../../../public/media/logo'
        },
        {
            id: 4,
            img: '../../../public/media/logo'
        }
    ]

    return (
       <div className="community-container">
           <h1 className="title">Community</h1>
           <div className="create-community">
                <span className='create-icon'>
                    <IconContext.Provider value={{ color: '#FFFFFF', size: '2em' }}>
                        <BsFillChatDotsFill />
                    </IconContext.Provider>
                </span>
           </div>
           <div className="joined-community">
                {community.map(element => (
                    <div key={element.id}>
                       <Link to='/'> <img src="./logo.png" alt="Community logo" className="logo"/></Link>
                    </div>
                ))}
           </div>
       </div>
    )
}

export default CommunitySection