
interface LabelProps {
    children: React.ReactNode;
    className?: string;
}

function Label({ children, className = "" }: LabelProps) {
  return (
    <div className={`font-semibold text-label text-[12px] ${className}`}>
      {children}
    </div>
  );
}

export default Label