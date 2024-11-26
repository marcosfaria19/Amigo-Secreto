const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`flex min-h-[calc(100vh-118px)] flex-col bg-background px-4 pb-4 text-foreground sm:px-8 md:px-12 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
