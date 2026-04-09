import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';
import authService from '../services/auth';
import { updateUser } from '../store/slices/authSlice';
import { mapErrorMessage } from '../services/errorMapper';
import '../styles/pages/MyPageModal.css';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const MyPageModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(user?.nickname || '');
  const [nicknameError, setNicknameError] = useState('');

  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [localMessageBox, setLocalMessageBox] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  useEffect(() => {
    if (user) {
      setNewNickname(user.nickname);
    }
  }, [user]);

  const handleUpdateNickname = async () => {
    if (!newNickname || newNickname === user?.nickname) {
      setIsEditingNickname(false);
      return;
    }

    if (newNickname.length < 2 || newNickname.length > 12) {
      setNicknameError('닉네임은 2자 이상 12자 이하로 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await authService.updateMe(newNickname);
      dispatch(updateUser(updatedUser));
      setIsEditingNickname(false);
      setLocalMessageBox({
        isOpen: true,
        type: 'success',
        title: '수정 완료',
        message: '닉네임이 성공적으로 변경되었습니다.',
      });
    } catch (error) {
      setNicknameError(mapErrorMessage(error, '닉네임 수정 중 오류가 발생했습니다.'));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validation
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = '현재 비밀번호를 입력해주세요.';
    if (!passwordData.newPassword) errors.newPassword = '새 비밀번호를 입력해주세요.';
    if (passwordData.newPassword.length < 8) errors.newPassword = '8자 이상의 비밀번호를 입력해주세요.';
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setLocalMessageBox({
        isOpen: true,
        type: 'success',
        title: '변경 완료',
        message: '비밀번호가 성공적으로 변경되었습니다.',
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsPasswordSectionOpen(false);
    } catch (error) {
      setLocalMessageBox({
        isOpen: true,
        type: 'error',
        title: '변경 실패',
        message: mapErrorMessage(error, '비밀번호 변경에 실패했습니다.'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mypage-page-container">
      <div className="mypage-modal-card">
        <div className="mypage-modal-header">
          <h2>마이페이지</h2>
        </div>

        <div className="mypage-modal-body">
          {/* 사용자 프로필 섹션 */}
          <div className="mypage-section">
            <span className="mypage-section-title">사용자 프로필</span>
            <div className="mypage-section-box">
              <div className="mypage-info-item">
                <label className="mypage-info-label">이메일</label>
                <div className="mypage-info-value-wrapper">
                  <span className="mypage-info-value">{user?.email}</span>
                </div>
              </div>

              <div className="mypage-info-item">
                <label className="mypage-info-label">닉네임</label>
                <div className="mypage-info-value-wrapper">
                  {isEditingNickname ? (
                    <div className="mypage-input-group" style={{ width: '100%' }}>
                      <Input
                        value={newNickname}
                        onChange={(e) => {
                          setNewNickname(e.target.value);
                          setNicknameError('');
                        }}
                        placeholder="새 닉네임 입력"
                        error={!!nicknameError}
                        helperText={nicknameError}
                        autoFocus
                      />
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                        <Button type="secondary" size="small" onClick={() => setIsEditingNickname(false)}>취소</Button>
                        <Button type="primary" size="small" onClick={handleUpdateNickname} loading={loading}>완료</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="mypage-info-value">{user?.nickname}</span>
                      <button className="mypage-edit-button" onClick={() => setIsEditingNickname(true)}>
                        <EditIcon /> 수정
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 비밀번호 변경 섹션 */}
          <div className="mypage-section">
            <div className="mypage-section-box">
              <div className="mypage-password-header" onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}>
                <span className="mypage-info-value" style={{ color: '#4B5563', fontSize: '14px' }}>비밀번호 변경</span>
                {isPasswordSectionOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </div>

              {isPasswordSectionOpen && (
                <div className="mypage-password-content">
                  <Input
                    label="현재 비밀번호"
                    type="password"
                    placeholder="현재 비밀번호를 입력해주세요"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    error={!!passwordErrors.currentPassword}
                    helperText={passwordErrors.currentPassword}
                  />
                  <Input
                    label="새 비밀번호"
                    type="password"
                    placeholder="새 비밀번호를 입력해주세요"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    error={!!passwordErrors.newPassword}
                    helperText={passwordErrors.newPassword}
                  />
                  <Input
                    label="새 비밀번호 확인"
                    type="password"
                    placeholder="새 비밀번호를 다시 입력해주세요"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    error={!!passwordErrors.confirmPassword}
                    helperText={passwordErrors.confirmPassword}
                  />
                  <div className="mypage-submit-wrapper">
                    <Button primary fullWidth onClick={handlePasswordChange} loading={loading}>
                      변경하기
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MessageBox
        isOpen={localMessageBox.isOpen}
        onClose={() => setLocalMessageBox({ ...localMessageBox, isOpen: false })}
        type={localMessageBox.type}
        title={localMessageBox.title}
        onConfirm={() => setLocalMessageBox({ ...localMessageBox, isOpen: false })}
      >
        {localMessageBox.message}
      </MessageBox>
    </div>
  );
};

export default MyPageModal;
