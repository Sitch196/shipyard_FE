interface ContainerProps {
  children: React.ReactNode;
  title: string;
}

export default function Container({ children, title }: ContainerProps) {
  return (
    <div>
      {title}
      {children}
    </div>
  );
}
