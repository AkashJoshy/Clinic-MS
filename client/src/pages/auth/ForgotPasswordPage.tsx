import ForgotPasswordForm from '@/components/shared/auth/ForgotPasswordForm'
import type { Role, RouteRoleProps } from '@/types/auth'

const ForgotPasswordPage = ({ role }: { role: Role } ) => {
  return (
    <div>
      <ForgotPasswordForm role={role} />
    </div>
  )
}

export default ForgotPasswordPage
