import React, { useState, useEffect } from 'react';
import { Heading, Flex, Button, useToast, Input, InputGroup, InputRightElement, IconButton, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { initialTimer } from "./config";
import { formatTime } from "./utils/index";
import PlayButton from './components/Playbutton';
import ResetButton from './components/Resetbutton';
import Settings from './components/Settings';
import { MdAdd, MdDelete, MdDone, MdSettings } from "react-icons/md"; 
import { color } from 'framer-motion';

function App() {
  const [time, setTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); 
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
      setNewTodo(""); 
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
    <Flex bgGradient="linear(to-tl, blue.900, #BFFCF9)" align="center" minHeight="100vh" flexDirection="column">
      <Heading color="#2A272A" letterSpacing="1px" textTransform="uppercase" fontWeight="bold" marginTop="7" marginBottom="5" textcolor='black' fontFamily={'Rubik Scribble'}>Pomofocus</Heading>

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
        <Flex gap={{ base: 2, md: 5 }} mb={4}>
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
         
        </Flex>

        <Flex alignItems={"center"} gap={2} mb={4}>
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

        
          <IconButton
            aria-label="Settings"
            icon={<MdSettings />}
            onClick={() => setShowSettings(!showSettings)}
            colorScheme="blackAlpha"
            size="lg" 
            fontSize="lg" 
            p={2} 
            boxSize={10}
          />
        </Flex>

       
        <Flex alignItems="center" justifyContent="center" flexDirection="column" position="relative">
          <CircularProgress value={time} max={initialTimer[0].value} color="#47817F" size="200px">
            <CircularProgressLabel>
              {formatTime(time)} 
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>

        {showSettings && <Settings initialTimer={initialTimer} onUpdateSettings={handleUpdateSettings} />} 

       
        <Flex flexDirection="column" mt={8} alignItems="flex-start" textColor={'black'}>
          <InputGroup size="md" width="300px" textColor={'black'}>
            <Input
              placeholder="Add a new todo"
              _placeholder={{ color: "black" }} 
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              textColor={'black'}
            />
            <InputRightElement width="3rem">
              <IconButton
                aria-label="Add todo"
                icon={<MdAdd />}
                onClick={addTodo}
                colorScheme="#000000"
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
                    colorScheme={todo.done ? "black" : "black"}
                    size="sm"
                  />
                  <IconButton
                    aria-label="Delete todo"
                    icon={<MdDelete />}
                    onClick={() => removeTodo(index)}
                    colorScheme="#82A0AA"
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
