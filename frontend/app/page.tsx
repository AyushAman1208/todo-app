
"use client"
import { register } from "@/lib/requests";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";


export default function Home() {
  const [accordionStates, setAccordionStates] = useState(["Task 1"]);
  const onValueChange = (value: Array<string>) => {
    setAccordionStates(value);
  };
  const tasks = [
    {
      title: "Task 1",
      description: " Description 1",
      completed: false,
      estimate: "1 hour",
    },
    {
      title: "Task 2",
      description: " Description 2",
      completed: false,
      estimate: "1 hour",
    },
    {
      title: "Task 3",
      description: " Description 1",
      completed: false,
      estimate: "1 hour",
    },
    {
      title: "Task 4",
      description: " Description 1",
      completed: false,
      estimate: "1 hour",
    },
  ];
  const registeredUser = register("Ayush","abc@gmail.com","12345678910","ayush")
  console.log("page",registeredUser);

  return (
    <div>
      
      {JSON.stringify(registeredUser)}
      <Accordion.Root
        type="multiple"
        value={accordionStates}
        onValueChange={onValueChange}
        className="w-[60%] pl-2 pt-2 flex flex-col border-solid border-4 gap-y-2"
      >
        {tasks.map((task) => (
          <Accordion.Item value={task.title} className="flex flex-col" key={`${task.title} asdgf`}>
            <Accordion.Trigger className="border-solid border-black border-2 w-full flex justify-between items-center rounded-sm">
              <Accordion.Header>{task.title}</Accordion.Header>
              <MdAdd/>
            </Accordion.Trigger>
            <Accordion.Content className="border-solid border-[1px] w-[96%] flex justify-center">
              <div>
                 dfgaefg
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
