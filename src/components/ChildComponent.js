import React, { useState, useEffect } from "react";

const ChildComponent = React.memo(({ state, setState }) => {
  //   useEffect(() => console.log("ChildComponent - mounted"), []);

  console.log("ChildComponent - render");
  return (
    <div>
      ChildComponent
      <button onClick={() => setState({ ...state, a: { b: 333 } })}>
        ChildComponent - Set object state
      </button>
    </div>
  );
});

export default ChildComponent;

// 1. Component cha render thì component con cũng render
// -> Để tránh tình trang này sử dụng React.memo
// 2. Prop đưa ở component cha nhưng không sử dụng ở component con thì component con vẫn rerender
