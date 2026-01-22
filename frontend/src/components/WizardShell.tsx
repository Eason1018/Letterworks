import type { ReactNode } from "react";

interface WizardShellProps {
  title: string;
  stepLabel?: string;
  children: ReactNode;
}

const WizardShell = ({ title, stepLabel, children }: WizardShellProps) => {
  return (
    <section className="wizard-shell">
      <header className="wizard-header">
        <h1>{title}</h1>
        {stepLabel && <p className="wizard-step">{stepLabel}</p>}
      </header>
      <div className="wizard-content">{children}</div>
    </section>
  );
};

export default WizardShell;
