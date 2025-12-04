import { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ onImageSelect, disabled }: ImageUploadProps) => {
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image under 10MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      onImageSelect(imageData);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [disabled, handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`relative border-2 border-dashed border-border rounded-2xl p-12 text-center transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-secondary/50 cursor-pointer'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Upload image"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="p-6 rounded-full bg-gradient-primary">
          <Upload className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Upload Your Black & White Photo</h3>
          <p className="text-muted-foreground">
            Drag and drop or click to select an image
          </p>
          <p className="text-sm text-muted-foreground">
            Supports JPG, PNG (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};