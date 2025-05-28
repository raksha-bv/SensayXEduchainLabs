import UnauthorizedAccess from "@/components/UnauthorizedAccess"


const page = () => {
  return <UnauthorizedAccess requiredPath="/courses" />;
}

export default page