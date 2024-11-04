import React from "react";

const AddTasksLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="bg-lavender min-h-screen">
      {children}
    </main>
  );
};

export default AddTasksLayout;
