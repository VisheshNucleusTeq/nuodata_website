import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import cronstrue from "cronstrue";
import timeZone from "../../helper/timeZone";
const Configure = () => {
  const [cronExpression, setCronExpression] = useState("");
  const [description, setDescription] = useState("");
  [
    {
      label: "Manager",
      options: [
        { label: "Jack", value: "jack" },
        { label: "Lucy", value: "lucy" },
      ],
    },
    {
      label: "Engineer",
      options: [{ label: "yiminghe", value: "Yiminghe" }],
    },
  ];

  const handleInputChange = (event) => {
    setCronExpression(event.target.value);
  };

  const handleParse = () => {
    try {
      const description = cronstrue.toString(cronExpression);
      setDescription(description);
    } catch (error) {
      setDescription(`Error parsing cron expression: ${error.message}`);
    }
  };

  useEffect(() => {
    console.log(timeZone);
    handleParse();
  }, [cronExpression]);

  return (
    <>
      <Input onChange={handleInputChange} />
      {/* <input type="text" value={cronExpression} onChange={handleInputChange} /> */}
      <div>
        <h2>Description</h2>
        <p>{description}</p>
      </div>

      <Select style={{ width: "100%" }} options={timeZone} />
    </>
  );
};

export default Configure;
