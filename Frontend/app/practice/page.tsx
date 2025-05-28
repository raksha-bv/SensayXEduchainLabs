"use client";
import React from "react";
import PracticeArena from "@/components/PracticeArena";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";


const PracticePage = () => {
  const { isInitialized, authState } = useOCAuth()

  // Show unauthorized component if not authenticated
  if (isInitialized && !authState.isAuthenticated) {
    return <UnauthorizedAccess requiredPath="/practice" />;
  }
  return (
    <div>
      <PracticeArena />
    </div>
  );
};

export default PracticePage;
