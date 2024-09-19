import React, { useState, useEffect } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'project-id': string;
        'agent-id': string;
        'language-code': string;
        'max-query-length': string;
      };
      'df-messenger-chat': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'chat-title': string;
      };
    }
  }
}

const Speedometer = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (showChatbot) {
      // Load the script
      const script = document.createElement('script');
      script.src = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
      script.async = true;
      document.body.appendChild(script);

      // Load the CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
      link.onerror = () => {
        console.warn('Failed to load Dialogflow CSS. Using fallback styles.');
      };
      document.head.appendChild(link);

      return () => {
        document.body.removeChild(script);
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [showChatbot]);

  const handleChatbotClick = () => {
    setShowChatbot(true);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <Card className="py-4 w-fit h-auto">
        <CardBody className="overflow-visible py-2 flex flex-col md:flex-row">
          <ReactSpeedometer
            height={200}
            width={350}
            maxValue={100}
            value={70}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
          />
          <div className='flex flex-col justify-center items-center space-y-8 m-8'>
            <Button color="primary" className="font-bold min-w-36" onClick={handleChatbotClick}>
              Use Chatbot
            </Button>
            <Button color="secondary" className="font-bold min-w-36">
              Use Summarize
            </Button>
          </div>
        </CardBody>
      </Card>
      
      {showChatbot && (
        <div className="chatbot-container">
          <Button 
            color="danger" 
            className="close-button" 
            onClick={handleCloseChatbot}
            size="sm"
          >
            X
          </Button>
          <df-messenger
            project-id="spry-blade-435912-d4"
            agent-id="cd2c8aae-4757-40e1-8e89-5f8e6cecf888"
            language-code="en"
            max-query-length="-1"
          >
            <df-messenger-chat chat-title="helper_agent"></df-messenger-chat>
          </df-messenger>
        </div>
      )}
      <style >{`
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          height: 450px;
          display: flex;
          flex-direction: column;
          z-index: 999;
          overflow: hidden; /* Hide overflow */
        }
        .close-button {
          align-self: flex-end;
          margin-bottom: 10px;
        }
        df-messenger {
          flex-grow: 1;
          --df-messenger-font-color: #000;
          --df-messenger-font-family: Google Sans, sans-serif;
          --df-messenger-chat-background: #f3f6fc;
          --df-messenger-message-user-background: #d3e3fd;
          --df-messenger-message-bot-background: #fff;
          height: calc(100% - 40px); /* Adjust height to account for close button */
          overflow-y: auto; /* Enable vertical scrolling */
        }
      `}</style>
    </div>
  );
};

export default Speedometer;