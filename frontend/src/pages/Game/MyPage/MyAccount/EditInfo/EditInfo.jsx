import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditInfo.scss';
import api from '../../../../../api/api';

const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;
const forbiddenspecials = /[^a-zA-Z0-9!@#$%^&*]/;

function EditInfo() {
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
    setOriginalNickname(storedNickname);

    api.get('/user/me')
      .then((res) => {
        console.log('✅ 사용자 정보 응답:', res.data);

        const changed = res.data.nicknameChanged;

        if (changed) {
          console.log('🛑 사용자는 이미 닉네임을 변경했습니다.');
          setNicknameChangeDisabled(true);
          setNickname('');
          setNicknameMessage('');
        } else {
          console.log('🟢 사용자는 아직 닉네임을 변경하지 않았습니다.');
          setNickname('');
        }
      })
      .catch((err) => {
        console.error('❌ 사용자 정보 조회 실패:', err);
        setNickname('');
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

  // ✅ validatePassword 함수를 useCallback으로 감싸서 useEffect 의존성 문제 해결
  const validatePassword = useCallback((value) => {
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
  }, [confirmPassword]); // ✅ confirmPassword를 의존성에 포함

  const handleNicknameChangeInput = async (value) => {
    setNickname(value);
    if (!nicknameChangeDisabled) {
      validateNickname(value);
      setNickname(value);
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
        setNicknameChangeDisabled(true); // 비활성화
        setNicknameMessage('닉네임이 성공적으로 변경되었습니다.');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('이미 닉네임을 1회 변경했습니다.');
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
  
  useEffect(() => {
    if (newPassword) {
      validatePassword(newPassword);
    }
  }, [newPassword, confirmPassword, validatePassword]);

  return (
    <div className="edit-profile">
      <span className="title">정보 수정</span>
      <form onSubmit={handleSubmit}>

        <div className="nickname-section">
          <label htmlFor="nickname">닉네임</label>

          {nicknameChangeDisabled ? (
            // ✅ 닉네임 변경 불가 시: 입력창/버튼/유효성 없이 메시지만 출력
            <p className="invalid">닉네임은 한 번만 변경할 수 있습니다.</p>
          ) : (
            // ✅ 닉네임 변경 가능 시: 전체 UI 노출
            <>
              <div className="nickname-input-wrapper">
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => handleNicknameChangeInput(e.target.value)}
                  placeholder="새 닉네임"
                />

                <button
                  type="button"
                  onClick={submitNicknameChange}
                  disabled={!isNicknameValid || nickname === originalNickname}
                >
                  변경
                </button>
              </div>
              <p className={isNicknameValid ? 'valid' : 'invalid'}>{nicknameMessage}</p>
            </>
          )}
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

export default EditInfo;

