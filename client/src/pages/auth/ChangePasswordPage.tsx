import NewPasswordForm from '@/components/shared/auth/NewPasswordForm'
import type { Role } from '@/types/auth'

const ChangePasswordPage = ({ role }: { role: Role }) => {
  return (
    <div>
      <NewPasswordForm role={role} />
    </div>
  )
}

export default ChangePasswordPage
