import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for React Router v6
import ReactSpeedometer, { CustomSegmentLabelPosition } from "react-d3-speedometer";
import { Card, CardBody, Button } from "@nextui-org/react";
import { saveAs } from 'file-saver';

// Import your custom icons if needed

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
  const [speedometerValue, setSpeedometerValue] = useState(100);
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate(); // useNavigate for React Router v6

  useEffect(() => {
    const handleStorageChange = () => {
      const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
      if (storedFiles.length > 0) {
        setSpeedometerValue(70);
        setTimeout(() => {
          setSpeedometerValue(100);
        }, 3000);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDownload = useCallback(() => {
    const chatContent = document.querySelector('df-messenger')?.shadowRoot?.querySelector('.message-list-wrapper')?.textContent;
    if (chatContent) {
      const blob = new Blob([chatContent], { type: 'text/plain' });
      saveAs(blob, 'chat_history.txt');
    }
  }, []);

  useEffect(() => {
    if (showChatbot) {
      const script = document.createElement('script');
      script.src = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
      script.async = true;
      script.onload = () => {
        customElements.whenDefined('df-messenger').then(() => {
          const dfMessenger = document.createElement('df-messenger');
          dfMessenger.setAttribute('project-id', 'spry-blade-435912-d4');
          dfMessenger.setAttribute('agent-id', 'cd2c8aae-4757-40e1-8e89-5f8e6cecf888');
          dfMessenger.setAttribute('language-code', 'en');
          dfMessenger.setAttribute('max-query-length', '-1');
          document.body.appendChild(dfMessenger);

          const style = document.createElement('style');
          style.textContent = `
            df-messenger {
              --df-messenger-button-titlebar-color: #2563EB;
            }
            .download-button {
              background: none;
              border: none;
              font-size: 24px;
              cursor: pointer;
              padding: 8px;
              color: white;
              position: absolute;
              right: 40px;
              top: 10px;
              z-index: 1000;
            }
          `;
          document.head.appendChild(style);

          const addDownloadButton = () => {
            const chatHeader = dfMessenger.shadowRoot?.querySelector('df-messenger-chat')?.shadowRoot?.querySelector('.chat-header');
            if (chatHeader && !chatHeader.querySelector('.download-button')) {
              const downloadButton = document.createElement('button');
              downloadButton.innerHTML = '⬇️';
              downloadButton.className = 'download-button';
              downloadButton.title = 'Download Chat History';
              downloadButton.onclick = handleDownload;
              chatHeader.appendChild(downloadButton);
            }
          };

          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const addedNode = mutation.addedNodes[0];
                if (addedNode.nodeType === Node.ELEMENT_NODE && (addedNode as Element).tagName === 'DF-MESSENGER-CHAT') {
                  setTimeout(addDownloadButton, 1000);
                  observer.disconnect();
                }
              }
            });
          });

          observer.observe(dfMessenger.shadowRoot!, { childList: true, subtree: true });
        });
      };
      document.body.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
      link.onerror = () => {
        console.warn('Failed to load Dialogflow CSS. Using fallback styles.');
      };
      document.head.appendChild(link);

      return () => {
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) document.body.removeChild(dfMessenger);
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [showChatbot, handleDownload]);

  const handleImageAnalysis = () => {
    navigate('/image'); // Navigate to "/image" route
  };

  return (
    <Card className="w-full h-full">
      <CardBody className="flex flex-col justify-between p-8 h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Analysis</h2>
        <div className="flex flex-col items-center justify-center flex-grow">
          <ReactSpeedometer
            height={250}
            width={300}
            maxValue={100}
            value={speedometerValue}
            needleColor="#2563EB"
            startColor="#EF4444"
            endColor="#10B981"
            segments={5}
            customSegmentLabels={[
              { text: "Very Low", position: CustomSegmentLabelPosition.Inside, color: "#FFFFFF" },
              { text: "Low", position: CustomSegmentLabelPosition.Inside, color: "#FFFFFF" },
              { text: "Medium", position: CustomSegmentLabelPosition.Inside, color: "#FFFFFF" },
              { text: "High", position: CustomSegmentLabelPosition.Inside, color: "#FFFFFF" },
              { text: "Very High", position: CustomSegmentLabelPosition.Inside, color: "#FFFFFF" },
            ]}
            ringWidth={25}
            needleTransitionDuration={3000}
            needleHeightRatio={0.7}
            forceRender={true}
          />
        </div>
        <div className="flex flex-col space-y-4 mt-6">
          <Button
            color="primary"
            size="lg"
            className="font-semibold"
            onClick={() => setShowChatbot(true)}
            startContent={<ChatIcon />}
          >
            Start Chatbot Analysis
          </Button>
          <Button
            color="secondary"
            size="lg"
            className="font-semibold"
            startContent={<SummarizeIcon />}
          >
            Generate Summary
          </Button>
          <Button
            color="success"
            size="lg"
            className="font-semibold"
            onClick={handleImageAnalysis} // Attach handleImageAnalysis function here
            startContent={<ImageAnalysisIcon />}
          >
            Analyze Images
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const SummarizeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 3v2M15 3v2M7 10h10M7 14h8M7 18h6" />
  </svg>
);

const ImageAnalysisIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h2m4 0h10M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 12h.01M15 12h.01M12 12h.01M9 16h6" />
  </svg>
);

export default Speedometer;
