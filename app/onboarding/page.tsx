import { Logo } from "@/components/logo";
import { OnboardingCard } from "@/components/onboarding-card";

export default function OnboardingPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col items-center gap-y-6">
        <Logo />
        <h1 className="text-4xl font-bold">Welcome to Connect Four!</h1>
        <p className="text-lg text-white/70">
          Let's set up your epic game of Connect Four!
        </p>
      </div>
      <div className="mt-8">
        <OnboardingCard />
      </div>
    </div>
  );
}
