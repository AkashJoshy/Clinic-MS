import React from "react";
import { XCircle, ArrowLeft, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DoctorRegistrationRejectedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-red-50 p-6 flex justify-center items-center border-b border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <div className="p-8 text-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Not Approved</h1>
            <p className="text-gray-500 text-sm">
              We regret to inform you that your doctor profile registration could not be approved at this time.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100">
            <div className="flex items-start space-x-3 mb-3">
              <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Check Your Email</h4>
                <p className="text-xs text-gray-500 mt-1">We have sent a detailed email explaining the reasons for this decision and the specific documents or details that need correction.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">How to Reapply</h4>
                <p className="text-xs text-gray-500 mt-1">You will find a reapplication link or form attached to the email. Please use it to submit your updated credentials.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button asChild className="w-full">
              <Link to="/doctor-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Have questions? Contact our <a href="#" className="text-primary hover:underline">support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistrationRejectedPage;
