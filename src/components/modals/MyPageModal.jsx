import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../common/Input';
import Button from '../common/Button';
import MessageBox from '../common/MessageBox';
import authService from '../../services/auth';
import { updateUser } from '../../store/slices/authSlice';
import { mapErrorMessage } from '../../services/errorMapper';
import learncodeIcon from '../../assets/logo-auth.png';
import '../../styles/components/modals/MyPageModal.css';

const ClearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
  </svg>
);

const MyPageModal = ({ isOpen = true, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const currentPasswordRef = useRef(null);

  const [newNickname, setNewNickname] = useState(user?.nickname || '');
  const [nicknameError, setNicknameError] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [localMessageBox, setLocalMessageBox] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });
  const [passwordServerError, setPasswordServerError] = useState('');

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close MyPageModal ONLY if no child MessageBox is open
      if (e.key === 'Escape' && isOpen && !localMessageBox.isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, localMessageBox.isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setNewNickname(user.nickname);
      }
      // Reset password section when opening
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
      setNicknameError('');
      setPasswordServerError('');
      setLocalMessageBox((prev) => ({ ...prev, isOpen: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Removed 'user' to prevent success messages from closing immediately after update

  // Auto focus/select on server-side password error
  useEffect(() => {
    if (passwordServerError && currentPasswordRef.current) {
      currentPasswordRef.current.focus();
      if (currentPasswordRef.current.select) {
        currentPasswordRef.current.select();
      }
    }
  }, [passwordServerError]);

  if (!isOpen) return null;

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


  const validateNickname = (value) => {
    if (!value) return '닉네임은 2자 이상 12자 이하로 입력해주세요.';
    if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
    if (value.length < 2 || value.length > 12) return '닉네임은 2자 이상 12자 이하로 입력해주세요.';
    return '';
  };

  const validateCurrentPassword = (value) => {
    if (!value) return '현재 비밀번호를 입력해주세요.';
    return '';
  };

  const validateNewPassword = (value) => {
    if (!value) return '새 비밀번호를 입력해주세요.';
    if (value.length < 8) return '8자 이상의 비밀번호를 입력해주세요.';
    return '';
  };

  const validateConfirmPassword = (newPwd, confirmPwd) => {
    if (!confirmPwd) return '비밀번호 확인을 입력해주세요.';
    if (newPwd !== confirmPwd) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handlePasswordDataChange = (name, value) => {
    if (passwordServerError) setPasswordServerError('');
    const nextData = { ...passwordData, [name]: value };
    setPasswordData(nextData);

    const nextErrors = { ...passwordErrors };
    if (name === 'currentPassword') nextErrors.currentPassword = validateCurrentPassword(value);
    if (name === 'newPassword') {
      nextErrors.newPassword = validateNewPassword(value);
      nextErrors.confirmPassword = validateConfirmPassword(value, nextData.confirmPassword);
    }
    if (name === 'confirmPassword') {
      nextErrors.confirmPassword = validateConfirmPassword(nextData.newPassword, value);
    }
    setPasswordErrors(nextErrors);
  };

  const handlePasswordChange = async (e) => {
    if (e) e.preventDefault();

    // Final validation before sumbit
    const finalErrors = {
      currentPassword: validateCurrentPassword(passwordData.currentPassword),
      newPassword: validateNewPassword(passwordData.newPassword),
      confirmPassword: validateConfirmPassword(passwordData.newPassword, passwordData.confirmPassword),
    };

    if (Object.values(finalErrors).some(err => err !== '')) {
      setPasswordErrors(finalErrors);
      return;
    }

    setLoading(true);
    try {
      setPasswordServerError('');
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
      // Handle Specific Error for Password Change Context
      const errorCode = error.response?.data?.error?.code || error.response?.data?.message;
      let errorMessage = mapErrorMessage(error, '비밀번호 변경에 실패했습니다.');
      
      if (errorCode === 'INVALID_PASSWORD' || errorCode === 'INVALID_CREDENTIALS') {
        const msg = '현재 비밀번호가 올바르지 않습니다.';
        setPasswordErrors(prev => ({ ...prev, currentPassword: msg }));
        setPasswordServerError(msg);
      } else {
        setLocalMessageBox({
          isOpen: true,
          type: 'error',
          title: '변경 실패',
          message: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mypage-modal-overlay" onClick={onClose}>
      <div className="mypage-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="mypage-modal-close" onClick={onClose} aria-label="닫기">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="auth-header">
          <img src={learncodeIcon} alt="Learn Code Logo" className="auth-logo-icon" />
          <h1 className="auth-page-title">
            <em>Learn Code</em> 프로필 수정
          </h1>
          <p className="auth-page-subtitle">회원님의 정보를 확인하고 안전하게 관리하세요.</p>
        </div>

        <div className="mypage-field-section">
          <label className="mypage-field-label">이메일 계정</label>
          <div className="mypage-email-static">{user?.email || ''}</div>
        </div>

        <div className="mypage-field-section">
          <label className="mypage-field-label">닉네임</label>
          <div className="mypage-input-group">
            <Input
              value={newNickname}
              onChange={(e) => {
                const val = e.target.value;
                setNewNickname(val);
                setNicknameError(validateNickname(val));
              }}
              placeholder="새 닉네임 입력"
              error={!!nicknameError}
              helperText={nicknameError}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && hasNicknameChanged && !loading) {
                  handleUpdateNickname();
                }
              }}
              autoFocus
              disabled={loading}
            />
            {newNickname && !nicknameError && (
              <button
                className="mypage-clear-btn"
                onClick={() => setNewNickname('')}
                disabled={loading}
              >
                <ClearIcon />
              </button>
            )}
          </div>
          <div className="mypage-save-btn-wrapper">
            <Button
              primary
              fullWidth
              size="medium"
              onClick={handleUpdateNickname}
              loading={loading}
              disabled={!hasNicknameChanged || loading}
            >
              닉네임 업데이트
            </Button>
          </div>
        </div>

        <div className="mypage-divider" />

        <div className="mypage-field-section">
          {!isChangingPassword ? (
            <div className="mypage-password-toggle-wrapper">
              <button
                type="button"
                className="mypage-password-toggle-btn"
                onClick={() => setIsChangingPassword(true)}
              >
                비밀번호를 변경하시겠습니까?
              </button>
            </div>
          ) : (
            <div className="mypage-password-section-active">
              <div className="mypage-section-header">
                <label className="mypage-field-label">비밀번호 변경</label>
                <button
                  type="button"
                  className="mypage-section-cancel-btn"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordErrors({});
                  }}
                >
                  취소
                </button>
              </div>
              <div className="mypage-password-box">
                <Input
                  type="password"
                  name="currentPassword"
                  ref={currentPasswordRef}
                  placeholder="현재 비밀번호 입력"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordDataChange('currentPassword', e.target.value)}
                  error={!!passwordErrors.currentPassword}
                  helperText={passwordErrors.currentPassword}
                  autoFocus
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePasswordChange(e);
                  }}
                />
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="새 비밀번호 (8자 이상)"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordDataChange('newPassword', e.target.value)}
                  error={!!passwordErrors.newPassword}
                  helperText={passwordErrors.newPassword || '8~72자, 대/소문자, 숫자, 특수문자 포함'}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePasswordChange(e);
                  }}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="새 비밀번호 확인"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordDataChange('confirmPassword', e.target.value)}
                  error={!!passwordErrors.confirmPassword}
                  helperText={passwordErrors.confirmPassword}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePasswordChange(e);
                  }}
                />
                <Button 
                  primary 
                  fullWidth 
                  onClick={handlePasswordChange} 
                  loading={loading}
                  disabled={
                    loading || 
                    !passwordData.currentPassword || 
                    !passwordData.newPassword || 
                    !passwordData.confirmPassword ||
                    Object.values(passwordErrors).some(err => err !== '')
                  }
                >
                  비밀번호 저장
                </Button>
              </div>
            </div>
          )}
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

MyPageModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MyPageModal;
