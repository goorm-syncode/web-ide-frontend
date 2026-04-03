import Input from '../../components/common/Input';

const DevInputPage = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Dev: Input Component</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '300px', marginTop: '24px' }}>
        <Input placeholder="Default Input" />
        <Input placeholder="Search..." icon="search" />
        <Input placeholder="With helper text" helperText="This is a helper" />
        <Input placeholder="Error State" error helperText="This is an error" />
        <Input placeholder="Disabled Input" disabled value="Cannot edit this" />
      </div>
    </div>
  );
};

export default DevInputPage;
