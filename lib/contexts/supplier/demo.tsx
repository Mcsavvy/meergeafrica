"use client";
import React from "react";

const DemoContext = React.createContext({
  demo: false,
  toggleDemo: () => {},
});

const DemoModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [demo, setDemo] = React.useState(false);

  const toggleDemo = () => {
    setDemo(!demo);
  };

  return (
    <DemoContext.Provider value={{ demo, toggleDemo }}>
      {children}
    </DemoContext.Provider>
  );
};

export { DemoContext, DemoModeProvider };
