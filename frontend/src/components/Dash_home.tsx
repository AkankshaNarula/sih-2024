import React, { useState } from "react";
import Ava from "../components/Avatar";
import Nav from "../components/Nav";
import Speedometer from "@/components/Speedometer";
import Upload from "@/components/Upload";
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import jsPDF from "jspdf";

function Dash_Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const languages = ["English", "Spanish", "French", "German", "Chinese"];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Chatbot History", 10, 10);
    // Add more content to the PDF as needed
    doc.save("chatbot_history.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Dashboard</h1>

        <div className="mb-8">
          <Ava />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <Speedometer />
          </div>
          <div>
            <Card>
              <CardBody>
                <Upload />
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 flex-wrap">
          <span className="text-gray-700 mr-2">Select language:</span>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">{selectedLanguage}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Language selection"
              onAction={(key) => setSelectedLanguage(key.toString())}
            >
              {languages.map((lang) => (
                <DropdownItem key={lang}>{lang}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            variant="bordered"
            color="primary"
            onClick={handleDownloadPDF}
            className="font-semibold px-8 py-6 text-lg"
            size="lg"
          >
            Download Chat
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dash_Home;
