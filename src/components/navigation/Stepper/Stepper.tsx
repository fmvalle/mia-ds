import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StepperStep = {
  id: string
  label: string
  description?: string
}

export type StepperProps = {
  steps: StepperStep[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
}: StepperProps) {
  return (
    <nav
      aria-label="Progress"
      className={cn(
        orientation === 'horizontal' ? 'flex w-full items-start' : 'flex flex-col',
        className,
      )}
    >
      <ol
        className={cn(
          'flex w-full',
          orientation === 'horizontal' ? 'items-start' : 'flex-col gap-4',
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <li
              key={step.id}
              className={cn(
                'flex items-start',
                orientation === 'horizontal' && index < steps.length - 1 && 'flex-1',
              )}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div
                className={cn(
                  'flex items-start gap-3',
                  orientation === 'horizontal' && 'w-full',
                )}
              >
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                      isCompleted && 'bg-primary-500 text-white',
                      isCurrent && 'border-2 border-primary-500 bg-primary-50 text-primary-500',
                      isUpcoming && 'border-2 border-border bg-surface text-text-subtle',
                    )}
                  >
                    {isCompleted ? <Check className="size-4" aria-hidden /> : index + 1}
                  </span>
                  {orientation === 'horizontal' && index < steps.length - 1 && (
                    <div
                      className={cn(
                        'mt-4 hidden h-0.5 w-full sm:block',
                        isCompleted ? 'bg-primary-500' : 'bg-border',
                      )}
                      aria-hidden
                    />
                  )}
                </div>

                <div className={cn('min-w-0 pb-4', orientation === 'horizontal' && 'hidden sm:block')}>
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-text' : isCompleted ? 'text-text-muted' : 'text-text-subtle',
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-text-subtle">{step.description}</p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
