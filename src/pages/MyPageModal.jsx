import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';
import authService from '../services/auth';
import { updateUser } from '../store/slices/authSlice';
import { mapErrorMessage } from '../services/errorMapper';
import '../styles/pages/MyPageModal.css';

const ClearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
  </svg>
);

const MyPageModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [newNickname, setNewNickname] = useState(user?.nickname || '');
  const [nicknameError, setNicknameError] = useState('');

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

  const hasNicknameChanged = newNickname !== user?.nickname && newNickname.trim() !== '';

  const handleUpdateNickname = async () => {
    if (!hasNicknameChanged) return;

    if (newNickname.length < 2 || newNickname.length > 12) {
      setNicknameError('닉네임은 2자 이상 12자 이하로 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await authService.updateMe(newNickname);
      dispatch(updateUser(updatedUser));
      setLocalMessageBox({
        isOpen: true,
        type: 'success',
        title: '수정 완료',
        message: '닉네임이 성공적으로 변경되었습니다.',
      });
      setNicknameError('');
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
      setPasswordErrors({});
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
        <h2 className="mypage-title">마이페이지</h2>

        <div className="mypage-field-section">
          <label className="mypage-field-label">이메일</label>
          <Input 
            className="mypage-input-readonly" 
            value={user?.email || ''} 
            disabled 
          />
        </div>

        <div className="mypage-field-section">
          <label className="mypage-field-label">닉네임</label>
          <div style={{ position: 'relative' }}>
            <Input
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
                setNicknameError('');
              }}
              placeholder="새 닉네임 입력"
              error={!!nicknameError}
              helperText={nicknameError}
              disabled={loading}
              style={{ paddingRight: '36px' }}
            />
            {newNickname && (
              <button 
                className="mypage-clear-btn" 
                onClick={() => setNewNickname('')}
                style={{ position: 'absolute', right: '12px', top: '10px' }}
                disabled={loading}
              >
                <ClearIcon />
              </button>
            )}
          </div>
          {hasNicknameChanged && (
            <div className="mypage-save-btn-wrapper">
              <Button primary fullWidth size="medium" onClick={handleUpdateNickname} loading={loading}>
                변경사항 저장
              </Button>
            </div>
          )}
        </div>

        <div className="mypage-field-section">
          <label className="mypage-field-label">비밀번호 변경</label>
          <div className="mypage-password-box">
            <Input
              type="password"
              placeholder="현재 비밀번호 입력"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              error={!!passwordErrors.currentPassword}
              helperText={passwordErrors.currentPassword}
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="새 비밀번호 원칙(8자 이상)"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              error={!!passwordErrors.newPassword}
              helperText={passwordErrors.newPassword}
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="새 비밀번호 다시 입력"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              error={!!passwordErrors.confirmPassword}
              helperText={passwordErrors.confirmPassword}
              disabled={loading}
            />
            <Button primary fullWidth onClick={handlePasswordChange} loading={loading}>
              비밀번호 변경확인
            </Button>
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
