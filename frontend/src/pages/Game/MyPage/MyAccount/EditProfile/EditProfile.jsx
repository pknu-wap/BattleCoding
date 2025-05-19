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

    navigate('/mypage');
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
          <button type="cancel" onClick={() => navigate('/mypage')}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
