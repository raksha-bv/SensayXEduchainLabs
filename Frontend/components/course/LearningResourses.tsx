import React from "react";
import { Book, Users } from "lucide-react";

export const LearningResources: React.FC = () => {
  return (
    <div className="mt-8 bg-gray-900/60 border border-violet-900/30 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-3">Learning Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-violet-900/30 mr-3">
            <Book className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Documentation</h4>
            <p className="text-sm text-gray-400">
              Access official resources and references
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-violet-900/30 mr-3">
            <Users className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Community</h4>
            <p className="text-sm text-gray-400">
              Join discussions and get help from others
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningResources;
