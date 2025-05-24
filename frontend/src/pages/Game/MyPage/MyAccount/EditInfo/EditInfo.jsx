// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './EditInfo.scss';


// function EditProfile() {
//   const [nickname, setNickname] = useState(''); // 닉네임 상태
//   const [password, setPassword] = useState(''); // 새 비밀번호 상태
//   const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password && password !== confirmPassword) {
//       alert('비밀번호가 일치하지 않습니다.');
//       return;
//     }

//     localStorage.setItem('nickname', nickname);
//     if (password) {
//       localStorage.setItem('password', password);
//     }

//     navigate('/mypage');
//   };

//   return (
//     <div className="edit-profile">
//       <span className='title'>정보 수정</span>
//       <form onSubmit={handleSubmit}>

//         <div className="nickname-section">
//           <label htmlFor="nickname">닉네임</label>
//           <input
//             type="text"
//             id="nickname"
//             value={nickname}
//             onChange={(e) => setNickname(e.target.value)}
//             placeholder="새 닉네임"
//           />
//         </div>

//         <div className="password-section">
//           <label htmlFor="password">비밀번호 변경</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="새 비밀번호 입력"
//           />
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="비밀번호 확인"
//           />
//         </div>

//         <div className="buttons">
//           <button type="submit">저장</button>
//           <button type="button" onClick={(e) => {
//             e.preventDefault(); navigate('/mypage')}}>
//             취소
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default EditProfile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditInfo.scss';
import api from '../../../../../api/api';

const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;
const forbiddenspecials = /[^a-zA-Z0-9!@#$%^&*]/;

function EditProfile() {
  const [nickname, setNickname] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameChangeDisabled, setNicknameChangeDisabled] = useState(false); // ✅ 닉네임 변경 1회 제한

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname') || '';
    setNickname(storedNickname);
    setOriginalNickname(storedNickname);

    // ✅ 닉네임 변경 여부 확인 API 호출
    api.get('/user/nickname-changed')
      .then((res) => {
        if (res.data.changed) {
          setNicknameChangeDisabled(true);
          setNicknameMessage('닉네임은 한 번만 변경할 수 있습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const validateNickname = async (value) => {
    if (value.length < 4 || value.length > 12) {
      setNicknameMessage('닉네임은 4~12자로 입력해주세요.');
      setIsNicknameValid(false);
      return;
    }

    try {
      const res = await api.get('/user/check-nickname', { params: { nickname: value } });
      if (res.data === true) {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setIsNicknameValid(true);
      } else {
        setNicknameMessage('이미 사용 중인 닉네임입니다.');
        setIsNicknameValid(false);
      }
    } catch (err) {
      console.error(err);
      setNicknameMessage('닉네임 확인 중 오류가 발생했습니다.');
      setIsNicknameValid(false);
    }
  };

  const validatePassword = (value) => {
    if (forbiddenspecials.test(value)) {
      setPasswordMessage('사용할 수 없는 특수문자가 포함되어 있습니다.');
      setIsPasswordValid(false);
    } else if (!pwdRegex.test(value)) {
      setPasswordMessage('비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.');
      setIsPasswordValid(false);
    } else if (value !== confirmPassword) {
      setPasswordMessage('비밀번호가 일치하지 않습니다.');
      setIsPasswordValid(false);
    } else {
      setPasswordMessage('사용 가능한 비밀번호입니다.');
      setIsPasswordValid(true);
    }
  };

  const handleNicknameChangeInput = async (value) => {
    setNickname(value);
    if (!nicknameChangeDisabled) {
      validateNickname(value);
    }
  };

  const submitNicknameChange = async () => {
    if (nickname === originalNickname || !isNicknameValid || nicknameChangeDisabled) return;
    try {
      const res = await api.put('/user/profile/nickname', { newNickname: nickname });
      if (res.data.success) {
        alert(res.data.message);
        localStorage.setItem('nickname', nickname);
        setOriginalNickname(nickname);
        setNicknameChangeDisabled(true); // ✅ 1회 변경 후 비활성화
        setNicknameMessage('닉네임이 성공적으로 변경되었습니다.');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('닉네임 변경 중 오류가 발생했습니다.');
    }
  };

  const handlePasswordChange = async () => {
    if (!isPasswordValid || !currentPassword) return false;
    try {
      const res = await api.put('/user/profile/password', {
        currentPassword,
        newPassword
      });
      if (res.data.success) {
        alert(res.data.message);
        return true;
      } else {
        alert(res.data.message);
        return false;
      }
    } catch (err) {
      console.error(err);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordChanged = newPassword ? await handlePasswordChange() : true;
    if (passwordChanged) {
      navigate('/mypage');
    }
  };

  return (
    <div className="edit-profile">
      <span className="title">정보 수정</span>
      <form onSubmit={handleSubmit}>

        <div className="nickname-section">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => handleNicknameChangeInput(e.target.value)}
            placeholder="새 닉네임"
            disabled={nicknameChangeDisabled} // ✅ 1회 제한 적용
          />
          <p className={isNicknameValid ? 'valid' : 'invalid'}>{nicknameMessage}</p>

          <button
            type="button"
            onClick={submitNicknameChange}
            disabled={nicknameChangeDisabled || !isNicknameValid || nickname === originalNickname} // ✅ 항상 표시되지만 조건부 비활성화
          >
            닉네임 변경 확정
          </button>
        </div>

        <div className="password-section">
          <label htmlFor="password">비밀번호 변경</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호 입력"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            placeholder="새 비밀번호 입력"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validatePassword(newPassword);
            }}
            placeholder="비밀번호 확인"
          />
          <p className={isPasswordValid ? 'valid' : 'invalid'}>{passwordMessage}</p>
        </div>

        <div className="buttons">
          <button type="submit">저장</button>
          <button type="button" onClick={() => navigate('/mypage')}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;

