type Variant = 'primary' | 'success' | 'danger' | 'ghost' | 'coral';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:brightness-110',
  success: 'bg-success text-success-foreground hover:brightness-110',
  danger: 'bg-destructive text-destructive-foreground hover:brightness-110',
  coral: 'bg-coral text-coral-foreground hover:brightness-110 shadow-soft',
  ghost: 'bg-transparent text-foreground hover:bg-muted border border-border',
};

export function OpsButton({
  children,
  variant = 'primary',
  size = 'sm',
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: Variant;
  size?: 'xs' | 'sm';
  onClick?: () => void;
  disabled?: boolean;
}) {
  const sizeClass = size === 'xs' ? 'px-3 py-1.5 text-[11px]' : 'px-4 py-2 text-xs';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full font-extrabold tracking-wide transition active:scale-[0.98] ${VARIANTS[variant]} ${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
