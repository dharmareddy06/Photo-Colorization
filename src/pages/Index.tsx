import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ImageComparison } from '@/components/ImageComparison';
import { ProcessingState } from '@/components/ProcessingState';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type ProcessState = 'idle' | 'processing' | 'complete';

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [colorizedImage, setColorizedImage] = useState<string>('');
  const [processState, setProcessState] = useState<ProcessState>('idle');
  const { toast } = useToast();

  const handleImageSelect = async (imageData: string) => {
    setOriginalImage(imageData);
    setProcessState('processing');

    try {
      const { data, error } = await supabase.functions.invoke('colorize-image', {
        body: { imageData }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setColorizedImage(data.colorizedImage);
      setProcessState('complete');
      
      toast({
        title: 'Success!',
        description: 'Your photo has been beautifully colorized',
      });
    } catch (error: any) {
      console.error('Colorization error:', error);
      toast({
        title: 'Colorization failed',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
      setProcessState('idle');
      setOriginalImage('');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = colorizedImage;
    link.download = `colorized-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage('');
    setColorizedImage('');
    setProcessState('idle');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {processState === 'idle' && (
          <ImageUpload onImageSelect={handleImageSelect} />
        )}

        {processState === 'processing' && <ProcessingState />}

        {processState === 'complete' && colorizedImage && (
          <ImageComparison
            originalImage={originalImage}
            colorizedImage={colorizedImage}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default Index;