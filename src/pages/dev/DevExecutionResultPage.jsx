import ExecutionResultPanel from '../../components/features/ExecutionResultPanel';

function DevExecutionResultPage() {
  return (
    <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '20px', color: '#22262B' }}>
        ExecutionResultPanel 컴포넌트 테스트
      </h2>
      <ExecutionResultPanel status="idle" />
    </div>
  );
}

export default DevExecutionResultPage;
