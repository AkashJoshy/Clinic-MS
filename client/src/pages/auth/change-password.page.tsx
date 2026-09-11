import NewPasswordForm from '@/components/shared/auth/new-password-form.shared'
import type { Role } from '@/types/auth'

const ChangePasswordPage = ({ role }: { role: Role }) => {
  return (
    <div>
      <NewPasswordForm role={role} />
    </div>
  )
}

export default ChangePasswordPage
