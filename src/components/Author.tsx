import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

const Author = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About the Author</h1>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Dheeraj Vishwakarma</h2>
              <p className="text-gray-600 mt-2">Senior AI/ML Architect</p>
            </div>

            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                Experienced Senior Architect leading the charge to revolutionize the telecommunications landscape with the cutting-edge capabilities of AI and ML.
              </p>
              <p className="mb-4">
                I specialize in enhancing OSS/BSS solutions by infusing advanced AI and ML technologies into key systems such as Ericsson Charging System, Single View Billing System, Oracle Billing and Revenue Management (OBRM), Ericsson Mediation System (EMM), Nokia Flexi CMD (Mediation Zone), and Nokia Eventlink Data Refinery (Comptel Mediation) for VAS and IN Services.
              </p>
              <p className="mb-4">
                My primary focus involves using AI and ML to boost network performance, optimize resource allocation, and utilize predictive analytics for fault management and customer insights.
              </p>
              <p className="mb-4">
                My goal is to transform the telecom industry, ensuring it remains at the forefront of innovation by leveraging the potential of AI and ML advancements.
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                className="flex items-center gap-2"
                variant="outline"
                onClick={() => window.open("https://www.linkedin.com/in/dheeraj-vishwakarma-61350918/", "_blank")}
              >
                <LinkedInLogoIcon className="w-5 h-5" />
                Connect on LinkedIn
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="outline"
                onClick={() => window.open("mailto:dheeraj.vishwakarma@gmail.com")}
              >
                <EnvelopeClosedIcon className="w-5 h-5" />
                Send Email
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Author;