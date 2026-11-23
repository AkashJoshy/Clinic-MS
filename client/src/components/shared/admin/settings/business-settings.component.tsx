import React from "react";
import { Field, SettingRow, Note } from "./settings-ui.component";
import { SubscriptionSettings } from "./subscription-settings.component";
import { inputClass, num } from "../../../../constants/admin-settings.constant";
import type { BusinessSettingsSectionProps } from "@/types/admin-settings";
import { getBusinessSettingsSectionTheme } from "@/helpers/admin/settings.helper";

export const BusinessSettingsSection: React.FC<
  BusinessSettingsSectionProps
> = ({ sectionKey, business, currency, updateBusiness, isDark }) => {
  const theme = getBusinessSettingsSectionTheme(isDark, inputClass);

  switch (sectionKey) {
    case "PAYMENTS":
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={`Minimum payout (${currency})`} isDark={isDark}>
              <input
                type="number"
                min={0}
                className={theme.input}
                value={business.minimumPayout}
                onChange={(e) =>
                  updateBusiness("minimumPayout", num(e.target.value))
                }
              />
            </Field>

            <Field label="Payout processing time" isDark={isDark}>
              <select
                className={theme.input}
                value={business.payoutProcessingDays}
                onChange={(e) =>
                  updateBusiness("payoutProcessingDays", Number(e.target.value))
                }
              >
                {[1, 2, 3, 5, 7].map((days) => (
                  <option key={days} value={days}>
                    {days} business {days === 1 ? "day" : "days"}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Note isDark={isDark}>
            These are defaults. Payouts still depend on balance, verification
            and payment provider rules.
          </Note>
        </>
      );

    case "COMMISSIONS":
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Default commission (%)" isDark={isDark}>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                className={theme.input}
                value={business.commissionPercentage}
                onChange={(e) =>
                  updateBusiness(
                    "commissionPercentage",
                    Math.min(100, Math.max(0, num(e.target.value))),
                  )
                }
              />
            </Field>

            <Field label={`Platform fee (${currency})`} isDark={isDark}>
              <input
                type="number"
                min={0}
                className={theme.input}
                value={business.platformFee}
                onChange={(e) =>
                  updateBusiness("platformFee", num(e.target.value))
                }
              />
            </Field>
          </div>

          <Note isDark={isDark}>
            Check how these interact with doctor-specific contracts,
            subscriptions, refunds and taxes before applying them globally.
          </Note>
        </>
      );

    case "APPOINTMENTS":
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Default appointment duration" isDark={isDark}>
              <select
                className={theme.input}
                value={business.appointmentDuration}
                onChange={(e) =>
                  updateBusiness("appointmentDuration", Number(e.target.value))
                }
              >
                {[15, 20, 30, 45, 60].map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes} minutes
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Cancellation window" isDark={isDark}>
              <select
                className={theme.input}
                value={business.cancellationWindow}
                onChange={(e) =>
                  updateBusiness("cancellationWindow", Number(e.target.value))
                }
              >
                {[0, 2, 6, 12, 24, 48].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours === 0 ? "No minimum" : `${hours} hours before`}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className={`mt-5 pt-5 border-t ${theme.sectionDivider}`}>
            <SettingRow
              title="Auto-confirm appointments"
              description="Confirm eligible bookings automatically when business rules allow it."
              checked={business.autoConfirmAppointments}
              onChange={(v) => updateBusiness("autoConfirmAppointments", v)}
              isDark={isDark}
            />
          </div>
        </>
      );

    case "VERIFICATION":
      return (
        <>
          <SettingRow
            title="Admin approval required"
            description="Doctors need admin approval before they can use applicable features."
            checked={business.doctorApprovalRequired}
            onChange={(v) => updateBusiness("doctorApprovalRequired", v)}
            isDark={isDark}
          />

          <SettingRow
            title="KYC verification required"
            description="Collect identity and professional documents during onboarding."
            checked={business.kycRequired}
            onChange={(v) => updateBusiness("kycRequired", v)}
            isDark={isDark}
          />
        </>
      );

    case "PATIENTS":
      return (
        <>
          <SettingRow
            title="Patient reviews"
            description="Let eligible patients review completed appointments."
            checked={business.patientReviewsEnabled}
            onChange={(v) => updateBusiness("patientReviewsEnabled", v)}
            isDark={isDark}
          />

          <SettingRow
            title="Patient cancellation"
            description="Let patients cancel appointments within the cancellation policy."
            checked={business.patientCancellationEnabled}
            onChange={(v) => updateBusiness("patientCancellationEnabled", v)}
            isDark={isDark}
          />
        </>
      );

    case "SUBSCRIPTIONS":
      return (
        <SubscriptionSettings
          trialEnabled={business.trialEnabled}
          autoRenewal={business.autoRenewal}
          prorateUpgrades={business.prorateUpgrades}
          trialDays={business.trialDays}
          gracePeriodDays={business.gracePeriodDays}
          onUpdateBusiness={updateBusiness}
          isDark={isDark}
        />
      );

    default:
      return null;
  }
};

export default BusinessSettingsSection;