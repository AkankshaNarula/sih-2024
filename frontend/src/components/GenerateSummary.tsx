import React, { useState } from "react";
import { Card, CardBody, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Upload from "./Upload";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const languages = [
  { key: "en", name: "English" },
  { key: "es", name: "Spanish" },
  { key: "fr", name: "French" },
  { key: "de", name: "German" },
  { key: "it", name: "Italian" },
];

export default function GenerateSummary() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
 
  const placeholderSummary = `The Rights of Persons with Disabilities (RPWD) Act, 2016 mandates equal opportunity policies in establishments. GAIL's Equal Opportunity Policy ensures inclusivity for Persons with Benchmark Disabilities (PwBDs), providing equal employment without discrimination, subject to RPWD Act provisions.

The policy outlines that GAIL will follow government guidelines for posts identified for PwBDs, with reservations, relaxations, and concessions in recruitment. PwBD candidates will receive age relaxations, reduced qualifying marks, exemption from application fees, and provisions for scribes or interpreters. Recruitment and promotion processes for PwBDs will remain transparent, with separate interviews and barrier-free environments at test centers.

Post-recruitment, GAIL provides necessary training, including orientation and functional training, with periodic reviews to accommodate any additional needs of PwBD employees. Additionally, PwBD employees receive preference in transfer and posting, especially to their native places, and GAIL ensures that promotions are not denied due to disability.

PwBD employees are also eligible for special casual leave, transport allowances, and assistive devices such as ramps, wheelchairs, accessible toilets, and elevators with audio-visual signals. GAILs digital platforms, including its website and intranet, will be made accessible, adhering to Web Content Accessibility Guidelines (WCAG) 2.1.

Liaison and Grievance Redressal Officers are designated to ensure compliance with the policy and resolve any grievances. The policy will be registered with the Chief Commissioner for Persons with Disabilities and updated as per directives from the Government of India.`;

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    // Simulating summary generation process
    setTimeout(() => {
      setIsGenerating(false);
      setSummaryResult(placeholderSummary);
    }, 3000);
  };

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log(`Downloading PDF in ${selectedLanguage.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Generate Summary</h1>
      
      <Card className="mb-6">
        <CardBody>
          <Upload />
        </CardBody>
      </Card>

      <div className="flex justify-between mb-6">
        <Button
          color="primary"
          onClick={handleGenerateSummary}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Summary"}
        </Button>

        <div className="flex items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="capitalize"
              >
                {selectedLanguage.name}
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Language selection"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={new Set([selectedLanguage.key])}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                setSelectedLanguage(languages.find(lang => lang.key === selectedKey) || languages[0]);
              }}
            >
              {languages.map((language) => (
                <DropdownItem key={language.key}>{language.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="secondary"
            onClick={handleDownloadPDF}
            className="ml-2"
          >
            Download as PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardBody>
          {isGenerating ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="min-h-[10rem] p-4 bg-gray-100 rounded-lg">
              {summaryResult || "Generated summary will appear here."}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
