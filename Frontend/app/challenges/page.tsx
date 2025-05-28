"use client"
import CompetitionsSection from "@/components/CompetetionsSection"
import LoginButton from "@/components/LoginButton"
import Navbar from "@/components/Navbar"
import UnauthorizedAccess from "@/components/UnauthorizedAccess"
import {useOCAuth } from "@opencampus/ocid-connect-js"


const page = () => {
    const {isInitialized, authState,ocAuth} = useOCAuth()
  return (
    <section className="relative">
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10">
          Loading...
        </div>
      )}
      <Navbar />
      {isInitialized && !authState.isAuthenticated ? (
        <UnauthorizedAccess />
      ) : (
        <CompetitionsSection />
      )}
    </section>
  );}


export default page