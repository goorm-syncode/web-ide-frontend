import React, { useState } from 'react';
import MessageBox from '../../components/common/MessageBox';
import Button from '../../components/common/Button';
import './DevMessageBoxPage.css';

const DevMessageBoxPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const openModal = (config) => {
    setModalConfig(config);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="dev-page-container">
      <h1>MessageBox Component Preview</h1>
      <p className="dev-page-desc">
        기본 모달 및 상태 경고창(Success, Warning, Error) UI를 확인하세요.
      </p>

      <div className="dev-page-button-group">
        <Button
          type="primary"
          onClick={() =>
            openModal({
              title: '신규 기능 업데이트 안내',
              children: '새로운 기능을 사용해 보세요! (기본 Info UI입니다)',
              type: 'info',
              showIcon: false,
            })
          }
        >
          기본 MessageBox
        </Button>

        <Button
          type="primary"
          onClick={() =>
            openModal({
              title: '완료되었습니다',
              children: '요청하신 작업이 성공적으로 처리되었습니다.',
              type: 'success',
            })
          }
        >
          Success 상태경고창
        </Button>

        <Button
          type="secondary"
          onClick={() =>
            openModal({
              title: '주의가 필요합니다',
              children: '삭제된 데이터는 복구할 수 없습니다. 계속 진행하시겠습니까?',
              type: 'warning',
              showCancel: true,
            })
          }
        >
          Warning 상태경고창
        </Button>

        <Button
          type="danger"
          onClick={() =>
            openModal({
              title: '오류가 발생했습니다',
              children: '네트워크 연결이 불안정합니다. 잠시 후 다시 시도해주세요.',
              type: 'error',
            })
          }
        >
          Error 상태경고창
        </Button>
      </div>

      <MessageBox
        isOpen={isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        type={modalConfig.type}
        showIcon={modalConfig.showIcon !== false}
        showCancel={modalConfig.showCancel}
        onConfirm={closeModal}
        onCancel={closeModal}
        confirmText={modalConfig.type === 'warning' ? '진행하기' : undefined}
      >
        {modalConfig.children}
      </MessageBox>
    </div>
  );
};

export default DevMessageBoxPage;
