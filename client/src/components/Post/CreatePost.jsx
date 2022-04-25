import './CreatePost.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'

const CreatePost = () => {
    return (
       <div className='create-container'>
           <h1 className="title">Create post</h1>
           <form class="textarea-container">
               <textarea placeholder='Write something...'></textarea>
               <div className='upload-section'>
                    <div className='upload-icons'>
                        <span className='image-upload'>
                            {/*CHANGE ICON FOR ME*/}
                            <label htmlFor='img-input'>
                            <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                <BsFillChatDotsFill />
                            </IconContext.Provider>
                            </label>
                            <input id="img-input" type="file"/>
                        </span>
                        <span className='file-upload'>
                            {/*CHANGE ICON FOR ME*/}
                            <label htmlFor='file-input'>
                            <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                <BsFillChatDotsFill />
                            </IconContext.Provider>
                            </label>
                            <input id="file-input" type="file"/>
                        </span>
                   </div>
                   <button>Post</button>
               </div>
           </form>
       </div>
    )
}

export default CreatePost