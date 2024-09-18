import ReactSpeedometer from "react-d3-speedometer";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function Speedometer() {
  return (
    <div className="flex flex-row justify-center mt-16">
      <Card className="py-4 w-fit h-auto:">
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
            <Button color="default" className="font-bold min-w-36">
              Use Chatbot
            </Button>
            <Button color="default" className="font-bold min-w-36">
              Use Summarize
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Speedometer;