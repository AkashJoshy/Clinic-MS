import React from "react";
import { Clock, ArrowLeft, Mail, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DoctorRegistrationPendingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary/10 p-6 flex justify-center items-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center relative animate-pulse">
            <Clock className="w-10 h-10 text-primary" />
            <div className="absolute top-0 right-0 w-6 h-6 bg-amber-400 rounded-full border-4 border-white"></div>
          </div>
        </div>
        
        <div className="p-8 text-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Under Review</h1>
            <p className="text-gray-500 text-sm">
              Your doctor profile has been successfully submitted and is currently waiting for administrator approval.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100">
            <div className="flex items-start space-x-3 mb-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Verification Process</h4>
                <p className="text-xs text-gray-500 mt-1">Our team is reviewing your submitted credentials and documents to ensure compliance.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Next Steps</h4>
                <p className="text-xs text-gray-500 mt-1">You will receive an email notification once your account has been approved or if further information is required.</p>
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
            Need help? Contact our <a href="#" className="text-primary hover:underline">support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistrationPendingPage;
