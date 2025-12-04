import { Loader2 } from 'lucide-react';

export const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50 animate-pulse" />
        <Loader2 className="w-16 h-16 animate-spin text-primary relative" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Adding Colors...</h3>
        <p className="text-muted-foreground">
          Our AI is carefully analyzing and colorizing your photo
        </p>
      </div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};