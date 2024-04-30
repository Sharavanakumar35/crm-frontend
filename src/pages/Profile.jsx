import React, {useState, useEffect} from 'react';
import { useContexts } from '../contextAPI/context';
import { SlLocationPin } from "react-icons/sl";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import avatar from '../assets/avatar.png'
import { FaUserEdit } from "react-icons/fa";
import EditProfile from './EditProfile';
import MailPass from './MailPass';


const Profile = () => {
    const {user, updateUser} = useContexts();
    const [isEdit, setIsEdit] = useState(false);
    const [show, setShow] = useState(false);

    const [isProfileEdit, setIsProfileEdit] = useState(false);

    const [postImage, setPostImage] = useState( { image: user?.image})

    const createPost = async (newImage) => {
      // Assuming updateUser takes a new user object with updated image
      await updateUser({image: newImage });
      setIsEdit(false);
    }
  
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file); // Assuming convertToBase64 is defined somewhere
      setPostImage({ ...postImage, image : base64 })
      setIsEdit(true);
    }
  
    useEffect (() => {
      if (isEdit) {
        const isConfirmed = window.confirm("Click Ok to upload the profile picture");
        if (isConfirmed) {
          createPost(postImage.image);
        }
      }
    }, [postImage])
    return (
      <>
      <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
            Email Credentials
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MailPass email={user?.email}/>
          </Modal.Body>
    </Modal>

      <div className="wrapper">
        <div className="profileCard">

          <label htmlFor='file-upload' className="profilePicWrapper">
          <div className="profilePicBorder">
            <img className="profilePicImage" src={postImage?.image || avatar} alt="" />
            
            <div className='edit-icon'><FaUserEdit className='faUserEdit'/></div>
          </div>
          </label>

          <input
            style={{ display: "none" }}
            type="file"
            id="file-upload"
            name="image"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
          {!isProfileEdit && <>
            <div className="profileInfo">
            <h1>{user?.role}</h1>
          </div>

          <div className="profileInfo2">
            <h3>{user?.username}</h3>
            <p className='profileInfo-email'>{user?.email}</p>
            
            <p className="profileInfo-phone">
              <MdOutlinePhoneInTalk />
              <span className="ms-2">{user?.phone}</span>
            </p>

            <div className="profileInfo-Location">
              <SlLocationPin
                style={{
                  color: "#000000",
                }}
              />
              <span className="ms-2">{user?.location}</span>
            </div>

            <div className="profile-social">
              <a
                href={user?.facebookUrl}
                className="profile-social__item facebook"
                target="_blank"
              >
                <span className="icon-font">
                  <svg className="icon">
                    <use xlinkHref="#icon-facebook"></use>
                  </svg>
                </span>
              </a>

              <a
                href={user?.twitterUrl}
                className="profile-social__item twitter"
                target="_blank"
              >
                <span className="icon-font">
                  <svg className="icon">
                    <use xlinkHref="#icon-twitter"></use>
                  </svg>
                </span>
              </a>

              <a
                href={user?.instagramUrl}
                className="profile-social__item instagram"
                target="_blank"
              >
                <span className="icon-font">
                  <svg className="icon">
                    <use xlinkHref="#icon-instagram"></use>
                  </svg>
                </span>
              </a>
            </div>

            <svg hidden="hidden">
              <defs>
                <symbol id="icon-facebook" viewBox="0 0 32 32">
                  <title>facebook</title>
                  <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"></path>
                </symbol>

                <symbol id="icon-instagram" viewBox="0 0 32 32">
                  <title>instagram</title>
                  <path d="M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z"></path>
                  <path d="M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z"></path>
                  <path d="M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z"></path>
                </symbol>

                <symbol id="icon-twitter" viewBox="0 0 32 32">
                  <title>twitter</title>
                  <path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
                </symbol>
              </defs>
            </svg>
          </div>
          </>}

          {isProfileEdit && <EditProfile setIsProfileEdit={setIsProfileEdit} />}
        </div>
        <div className='d-flex justify-content-around align-items-center'>
          {!isProfileEdit &&
          
            <Button variant="primary" type="submit"  onClick={() => setIsProfileEdit(true)} className='mt-3 editProfileBtn'>
              Edit
            </Button>
          }

          {!user?.permissions.mail && 
          <Button variant="primary" type="submit"  onClick={() => setShow(true)} className='mt-3 ms-3 editProfileBtn'>
            Enable Mail
          </Button>
          }
{/* 
          <Button variant="primary" type="submit"  onClick={() => setShow(true)} className='mt-3 ms-3 editProfileBtn'>
            Enable Mail
          </Button> */}
        </div>
      </div>
      </>
    );
};

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export default Profile;