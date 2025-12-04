import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageComparisonProps {
  originalImage: string;
  colorizedImage: string;
  onDownload: () => void;
  onReset: () => void;
}

export const ImageComparison = ({ originalImage, colorizedImage, onDownload, onReset }: ImageComparisonProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-3">
          <div className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-center">
            Original
          </div>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-card">
            <img
              src={originalImage}
              alt="Original black and white"
              className="w-full h-full object-contain bg-card"
            />
          </div>
        </div>

        {/* Colorized Image */}
        <div className="space-y-3">
          <div className="px-4 py-2 rounded-full bg-gradient-primary text-sm font-medium text-primary-foreground text-center">
            Colorized
          </div>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-glow">
            <img
              src={colorizedImage}
              alt="AI colorized"
              className="w-full h-full object-contain bg-card"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={onDownload}
          size="lg"
          className="gap-2 bg-gradient-accent hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          Download Colorized Image
        </Button>
        <Button
          onClick={onReset}
          size="lg"
          variant="secondary"
        >
          Upload Another
        </Button>
      </div>
    </div>
  );
};