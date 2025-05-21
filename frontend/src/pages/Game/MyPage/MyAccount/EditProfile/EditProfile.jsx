import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.scss';

const profileImages = [
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656353/%EA%B8%B0%EB%B3%B8_%ED%94%84%EB%A1%9C%ED%95%84_o4xxyn.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656555/%EB%B0%B1%EA%B2%BD%EC%9D%B4_%EA%B8%B0%EB%B3%B8%ED%98%95_yduydu.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656555/%EB%BF%8C%EA%B3%B5%EC%9D%B4_%EA%B8%B0%EB%B3%B8%ED%98%95_mmomzd.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656355/%EC%BD%94%EB%94%A9%ED%95%98%EB%8A%94%EB%B0%B1%EA%B2%BD%EC%9D%B4_iqgavf.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656355/%EC%A7%B1%EA%B5%AC%EB%B0%B1%EA%B2%BD_u2evjx.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656354/%EB%B0%B1%EA%B2%BD%EC%9D%B4_%EC%8B%A4%EC%82%AC_mljnfn.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656355/%EC%A7%80%EB%B8%8C%EB%A6%AC%EB%B0%B1%EA%B2%BD_mhmfpg.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656355/%EC%A7%80%EB%B8%8C%EB%A6%AC%EB%82%A8_mv1kqa.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656355/%EC%A7%80%EB%B8%8C%EB%A6%AC%EB%85%80_jc2cc9.png',
  'https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656357/%EC%A7%80%EB%B8%8C%EB%A6%AC%EC%97%AC%EC%BA%90_xiff0j.png'
];

function EditProfile() {
  const [selectedImage, setSelectedImage] = useState(profileImages[0]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('profileImage', selectedImage);

    navigate('/mypage');
  };

  return (
    <div className="edit-profile">
      <span className='title'>사진 선택</span>
      <form onSubmit={handleSubmit}>

        <label htmlFor="image">사진</label>
        <div className="image-selection">
          {profileImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`avatar-${idx}`}
              className={selectedImage === img ? 'selected' : ''}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="buttons">
          <button type="submit">저장</button>
          <button type="cancel" onClick={() => navigate('/mypage')}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
