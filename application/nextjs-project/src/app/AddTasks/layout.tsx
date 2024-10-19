import React from "react";

const AddTasksLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default AddTasksLayout;
