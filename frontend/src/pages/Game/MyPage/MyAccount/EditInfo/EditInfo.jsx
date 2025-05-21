import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditInfo.scss';


function EditProfile() {
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

    localStorage.setItem('nickname', nickname);
    if (password) {
      localStorage.setItem('password', password);
    }

    navigate('/mypage');
  };

  return (
    <div className="edit-profile">
      <span className='title'>정보 수정</span>
      <form onSubmit={handleSubmit}>

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
