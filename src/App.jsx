import React, { useState, useEffect } from 'react';
import { Heading, Flex, Button, useToast, Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { initialTimer } from "./config";
import Time from './components/Time';
import { formatTime } from "./utils";
import PlayButton from './components/Playbutton';
import ResetButton from './components/Resetbutton';
import Settings from './components/Settings';
import { MdAdd, MdDelete, MdDone } from "react-icons/md";

function App() {
  const [time, setTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); // State for new todo input
  const toast = useToast();

  const handleUpdateSettings = (newTimings) => {
    console.log("Updated timings:", newTimings);
    setShowSettings(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0 && timerStart) {
          playNotificationSound();
          toast({
            title: "Timer has stopped",
            status: "error",
            position: "top-right"
          });
          clearInterval(interval);
        }
      }
    }, 1000);

    document.title = `${formatTime(time)} - Remaining `;
    return () => clearInterval(interval);
  }, [timerStart, time]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo.trim(), done: false }]);
      setNewTodo(""); // Clear input after adding todo
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleDone = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <Flex bgGradient="linear(to-tl, blue.700, blue.900)" align="center" minHeight="100vh" flexDirection="column">
      <Heading color="white" letterSpacing="1px" textTransform="uppercase" fontWeight="thin" marginTop="7" marginBottom="5">Pomofocus</Heading>

      <Flex
        bgGradient={"linear(to-b, red.700, red.900"}
        p={{ base: 6, md: 7, lg:8 }}
        rounded={"2xl"}
        alignItems={"center"}
        flexDirection={"column"}
        shadow={"dark-lg"}
        minHeight="100vh" 
        maxW="80vw" 
      >
        <Flex gap={{ base: 2, md: 5 }}>
          {initialTimer.map(({ value, display }) => (
            <Button
              key={value}
              colorScheme="blackAlpha"
              textTransform={"uppercase"}
              fontWeight={"light"}
              letterSpacing={"wide"}
              fontSize={{ base: "small", md: "medium", lg: "lg" }}
              size={{ base: "xs", md: "md", lg: "lg" }}
              onClick={() => {
                setTimerStart(false);
                setTime(value);
              }}
            >
              {display}
            </Button>
          ))}
          <Button onClick={() => setShowSettings(!showSettings)} colorScheme="blackAlpha"  textTransform={"uppercase"}
              fontWeight={"light"}
              letterSpacing={"wide"}
              fontSize={{ base: "small", md: "medium", lg: "lg" }}
              color="white"
              size={{ base: "xs", md: "md", lg: "lg" }}>Settings</Button> 
        </Flex>

        <Time currentTime={time}/>
        <Flex alignItems={"center"} gap={2}>
          <ResetButton
            handleOnClick={() => {
              setTimerStart(false)
              setTime(initialTimer[0].value)
            }}
          />

          <PlayButton
            isStarted={timerStart}
            currentTime={time}
            handleClick={() => {
              !time
                ? toast({
                    title: "You need to set a timer first",
                    status: "warning",
                    position: "top-right"
                  })
                : setTimerStart(!timerStart)
            }}
          />
        </Flex>

        {showSettings && <Settings initialTimer={initialTimer} onUpdateSettings={handleUpdateSettings} />} 

        {/* Todo List Section */}
        <Flex flexDirection="column" mt={8} alignItems="flex-start">
          <InputGroup size="md" width="300px" color={'white'}>
            <Input
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <InputRightElement width="3rem">
              <IconButton
                aria-label="Add todo"
                icon={<MdAdd />}
                onClick={addTodo}
                colorScheme="#eff6ff"
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          <ul style={{ listStyleType: "none", paddingInlineStart: 1, marginTop: "0.5rem" }}>
            {todos.map((todo, index) => (
              <li key={index} style={{ fontSize: "1rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", color:'white'}}>
                <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</span>
                <Flex ml="auto" alignItems="center">
                  <IconButton
                    aria-label="Mark as done"
                    icon={<MdDone />}
                    onClick={() => toggleDone(index)}
                    colorScheme={todo.done ? "green" : "gray"}
                    size="sm"
                  />
                  <IconButton
                    aria-label="Delete todo"
                    icon={<MdDelete />}
                    onClick={() => removeTodo(index)}
                    colorScheme="red"
                    size="sm"
                    ml={2}
                  />
                </Flex>
              </li>
            ))}
          </ul>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
