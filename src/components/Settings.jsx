// Settings.jsx
import React, { useState } from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';

const Settings = ({ initialTimer, onUpdateSettings }) => {
  const [timings, setTimings] = useState(initialTimer);

  const handleChange = (index, newValue) => {
    const updatedTimings = [...timings];
    updatedTimings[index].value = newValue;
    setTimings(updatedTimings);
  };

  const handleSave = () => {
    onUpdateSettings(timings);
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      {timings.map(({ id, value, label }, index) => (
        <Input
          key={id}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Enter ${label}`}
          marginBottom="2"
        />
      ))}
      <Button onClick={handleSave} colorScheme="blue">Save</Button>
    </Flex>
  );
};

export default Settings;
