import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

const Author = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About the Author</h1>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Dheeraj Vishwakarma</h2>
              <p className="text-gray-600 mt-2">AI/ML Engineer & Educator</p>
            </div>

            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                Dheeraj is a passionate AI/ML engineer with extensive experience in developing and implementing machine learning solutions. 
                He specializes in transformer architectures and deep learning applications.
              </p>
              
              <p className="mb-4">
                Through this learning platform, he aims to make complex AI concepts accessible to everyone, 
                breaking down advanced topics into understandable components.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                className="flex items-center gap-2"
                variant="outline"
                onClick={() => window.open("https://www.linkedin.com/in/dheeraj-vishwakarma-61350918/", "_blank")}
              >
                <LinkedInLogoIcon className="w-5 h-5" />
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Author;