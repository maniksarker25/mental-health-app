import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { AppScreen } from '../components/ui/AppScreen';
import { AppHeader } from '../components/ui/AppHeader';
import { AppButton } from '../components/ui/AppButton';
import { AppInput } from '../components/ui/AppInput';
import { PrivacyNotice } from '../components/ui/PrivacyNotice';
import { DeliveryMethodSelector } from '../components/send/DeliveryMethodSelector';
import { useShareStore } from '../store/useShareStore';
import { recipientSchema, type RecipientFormValues } from '../utils/validators';
import { countryCodes } from '../data/countryCodes';
import type { DeliveryMethod } from '../types';

export function RecipientPage() {
  const navigate = useNavigate();
  const selectedTopic = useShareStore((state) => state.selectedTopic);
  const recipient = useShareStore((state) => state.recipient);
  const setRecipient = useShareStore((state) => state.setRecipient);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<RecipientFormValues>({
    resolver: zodResolver(recipientSchema),
    mode: 'onSubmit',
    defaultValues: {
      method: recipient?.method ?? 'EMAIL',
      email: recipient?.email ?? '',
      countryCode: recipient?.countryCode ?? '+1',
      phone: recipient?.phone ?? ''
    } as RecipientFormValues
  });

  const method = watch('method');
  const fieldErrors = errors as Record<string, {message?: string;} | undefined>;

  const onSubmit = (values: RecipientFormValues) => {
    setRecipient(
      values.method === 'EMAIL' ?
      { method: 'EMAIL', email: values.email } :
      { method: 'SMS', countryCode: values.countryCode, phone: values.phone }
    );
    navigate('/send/message');
  };

  const changeMethod = (next: DeliveryMethod) => {
    clearErrors();
    setValue('method', next, { shouldValidate: false });
  };

  return (
    <AppScreen
      header={<AppHeader title="Who is this for?" step={{ current: 1, total: 3 }} />}
      footer={
      <AppButton type="submit" form="recipient-form">
          Continue
        </AppButton>
      }>
      
      <form id="recipient-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {selectedTopic &&
        <p className="mb-6 text-small text-ink-secondary">
            Sending{' '}
            <span className="font-semibold text-ink">{selectedTopic.name}</span>{' '}
            resources. We only need a destination — nothing about you.
          </p>
        }

        <h2 className="mb-3 text-h3 font-semibold text-ink">Delivery method</h2>
        <Controller
          control={control}
          name="method"
          render={({ field }) =>
          <DeliveryMethodSelector value={field.value} onChange={changeMethod} />
          } />
        

        <div className="mt-7 space-y-5">
          {method === 'EMAIL' ?
          <AppInput
            label="Recipient email address"
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder="name@example.com"
            leftIcon={<MailIcon aria-hidden className="h-4.5 w-4.5" strokeWidth={1.75} />}
            helperText="They’ll get a private link to open in any browser."
            error={fieldErrors.email?.message}
            {...register('email')} /> :


          <div className="space-y-5">
              <div>
                <label
                htmlFor="country-code"
                className="mb-2 block text-small font-semibold text-ink">
                
                  Country code
                </label>
                <select
                id="country-code"
                className="min-h-[54px] w-full rounded-2xl bg-surface px-4 text-body text-ink ring-1 ring-line transition-colors duration-150 ease-soft focus:outline-none focus:ring-primary/45"
                {...register('countryCode')}>
                
                  {countryCodes.map((country) =>
                <option key={country.code} value={country.code}>
                      {country.flag} {country.label} ({country.code})
                    </option>
                )}
                </select>
              </div>
              <AppInput
              label="Recipient phone number"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              placeholder="555 019 2847"
              leftIcon={
              <PhoneIcon aria-hidden className="h-4.5 w-4.5" strokeWidth={1.75} />
              }
              helperText="Standard message rates may apply for the recipient."
              error={fieldErrors.phone?.message}
              {...register('phone')} />
            
            </div>
          }
        </div>

        <PrivacyNotice className="mt-7" tone="soft" icon="lock">
          Your identity will not be included in the message. We don’t store the
          recipient’s details after it’s delivered.
        </PrivacyNotice>
      </form>
    </AppScreen>);

}