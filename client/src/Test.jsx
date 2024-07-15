import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    console.log(
      "renderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
    );
  }, []);

  return (
    <>
      <h1>test</h1>
    </>
  );
};

export default Test;
