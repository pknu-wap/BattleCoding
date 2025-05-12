import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.scss';

const profileImages = [
  'https://cdn.pixabay.com/photo/2025/04/30/03/22/popsicle-9568309_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/05/04/17/47/dog-9578735_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/03/25/15/57/flowers-9492798_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/03/23/22/04/bluejay-9489628_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/05/15/20/57/developer-8764521_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/04/09/03/04/ai-generated-8684869_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/01/24/21/41/woman-8530607_1280.png',
  'https://cdn.pixabay.com/photo/2019/09/16/20/21/cat-cat-4481997_1280.jpg'
];

function EditProfile() {
  const [selectedImage, setSelectedImage] = useState(profileImages[0]);
  const [nickname, setNickname] = useState(''); // 닉네임 상태
  const [password, setPassword] = useState(''); // 새 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    localStorage.setItem('profileImage', selectedImage);
    localStorage.setItem('nickname', nickname);
    if (password) {
      localStorage.setItem('password', password);
    }

    navigate('/mypage/edit');
  };

  return (
    <div className="edit-profile">
      <span className='title'>프로필 수정</span>
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

        <div className="nickname-section">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="새 닉네임"
            required
          />
        </div>

        <div className="password-section">
          <label htmlFor="password">비밀번호 변경</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="새 비밀번호 입력"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />
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
