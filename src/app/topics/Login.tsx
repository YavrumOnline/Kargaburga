import { useState } from 'react';
import { SlideContainer } from '@/app/components/SlideContainer';
import { FormField } from '@/app/components/FormField';

export function Login({ darkMode }: { darkMode?: boolean }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SlideContainer>
      <div style={{ maxWidth: '24rem', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <FormField
            id="username"
            label="Kullanıcı Adı"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            darkMode={darkMode}
          />

          <FormField
            id="password"
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            darkMode={darkMode}
          />
        </div>
      </div>
    </SlideContainer>
  );
}