import React from 'react';
import { Box } from '@mui/material';

interface TelegramLoginButtonProps {
  dataAuthUrl: string;
  botName: string;
}

export default function TelegramLoginButton({ dataAuthUrl, botName }: TelegramLoginButtonProps) {
  const boxRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const boxRefCurrent = boxRef.current;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.async = true;
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-auth-url', dataAuthUrl);
    script.setAttribute('data-request-access', 'write');
    if (boxRefCurrent) {
      boxRef.current.appendChild(script);
    }
    return () => {
      if (boxRefCurrent) {
        boxRefCurrent.removeChild(script);
      }
    };
  }, [botName, dataAuthUrl]);

  return <Box ref={boxRef} />;
}
