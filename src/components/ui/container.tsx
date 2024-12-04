interface ContainerProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
    return (
      <div
        className={`mx-4 flex min-h-[calc(100vh-112px)] flex-col bg-background text-foreground sm:mx-8 md:mx-12 lg:mx-16 ${className}`}
      >
        {children}
      </div>
    );
  };
  
  export default Container;
  