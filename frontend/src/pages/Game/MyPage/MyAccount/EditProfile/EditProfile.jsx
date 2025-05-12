import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.scss';

const profileImages = [
  'https://cdn.pixabay.com/photo/2025/04/30/03/22/popsicle-9568309_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/05/04/17/47/dog-9578735_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/03/25/15/57/flowers-9492798_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/03/23/22/04/bluejay-9489628_1280.jpg',
];

function EditProfile() {
  const [selectedImage, setSelectedImage] = useState(profileImages[0]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/mypage');
  };

  return (
    <div className="edit-profile">
      <h2>프로필 수정</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="button" onClick={() => navigate('/mypage')}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
