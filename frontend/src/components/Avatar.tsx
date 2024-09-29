import React from 'react';
import { Card, CardBody, Avatar as NextUIAvatar } from "@nextui-org/react";

const Avatar = () => {
  return (
    <Card className="w-full h-full">
      <CardBody className="flex flex-col items-center justify-center p-6">
        <NextUIAvatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          className="w-32 h-32 text-large mb-6"
        />
        <h3 className="text-2xl font-semibold mb-4">Rohan Mittal</h3>
        <p className="text-lg text-gray-600 mb-6">GAIL Engineer</p>
        <div className="w-full space-y-2">
          <p className="text-sm text-gray-600 flex justify-between">
            <span className="font-medium">Email:</span>
            <span>rohanmittal@gmail.com</span>
          </p>
          <p className="text-sm text-gray-600 flex justify-between">
            <span className="font-medium">Location:</span>
            <span>Chandigarh, India</span>
          </p>
          <p className="text-sm text-gray-600 flex justify-between">
            <span className="font-medium">Member since:</span>
            <span>September 2024</span>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Avatar;