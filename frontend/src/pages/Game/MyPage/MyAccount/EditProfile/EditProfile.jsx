import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.scss';
import api from '../../../../../api/api';

function EditProfile() {
  const [profileImages, setProfileImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get('/profile/images');
        setProfileImages(res.data); // 이미지 리스트 배열로 설정
        setSelectedImage(res.data[0]); // 첫 번째 이미지 선택
      } catch (err) {
        console.error('이미지 목록 불러오기 실패:', err);
      }
    };

    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put('/user/profile/image', {
        profileImage: selectedImage,
      });

      navigate('/mypage');
    } catch (err) {
      console.error('프로필 이미지 저장 실패:', err);
      alert('이미지 저장 중 오류가 발생했습니다.');
    }
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
          <button type="button" onClick={(e) => {
            e.preventDefault(); navigate('/mypage')}}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
