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
        <h3 className="text-2xl font-semibold mb-4">John Doe</h3>
        <p className="text-lg text-gray-600 mb-6">Software Developer</p>
        <div className="w-full space-y-2">
          <p className="text-sm text-gray-600 flex justify-between">
            <span className="font-medium">Email:</span>
            <span>john.doe@example.com</span>
          </p>
          <p className="text-sm text-gray-600 flex justify-between">
            <span className="font-medium">Location:</span>
            <span>New York, USA</span>
          </p>
          <p className="text-sm text-gray-600 flex justify-between">
            <span className="font-medium">Member since:</span>
            <span>January 2023</span>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Avatar;