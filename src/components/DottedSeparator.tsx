import { cn } from '@/lib/utils';

interface DottedSeparatotProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: 'horizontal' | 'vertical';
}

export const DottedSeparator = ({
  className,
  color = 'd4d4d8',
  height = '2px',
  dotSize = '2px',
  gapSize = '6px',
  direction = 'horizontal',
}: DottedSeparatotProps) => {
  const isHorozantal = direction === 'horizontal';
  return (
    <div
      className={cn(
        isHorozantal ? 'w-full flex items-center' : 'h-full flex flex-col items-center',
        className
      )}
    >
      <div
        className={isHorozantal ? 'grow' : ' grow-0'}
        style={{
          width: isHorozantal ? '100%' : height,
          height: isHorozantal ? height : '100%',
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorozantal
            ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
            : ` ${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
          backgroundRepeat: isHorozantal ? 'repeat-x' : 'repeat-y',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};
