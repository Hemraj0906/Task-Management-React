// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import Column from "./Column";
// import AddTaskForm from "./AddTaskForm";
// import UpdateTaskForm from "./UpdateTaskForm";
// import { DragDropContext } from "@hello-pangea/dnd";
// import { v4 as uuidv4 } from "uuid";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const initialData = {
//   tasks: [],
//   columns: [
//     { id: "to-do", title: "To Do" },
//     { id: "in-progress", title: "In Progress" },
//     { id: "qa-review", title: "QA-Review" },
//     { id: "done", title: "Done" },
//   ],
// };

// const KanbanBoard = () => {
//   const [data, setData] = useState(initialData);
//   const [isAddFormOpen, setIsAddFormOpen] = useState(false);
//   const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
//   const [currentColumnId, setCurrentColumnId] = useState(null);
//   const [currentTask, setCurrentTask] = useState(null);

//   const openAddForm = (columnId) => {
//     setCurrentColumnId(columnId);
//     setIsAddFormOpen(true);
//   };

//   const closeAddForm = () => {
//     setIsAddFormOpen(false);
//     setCurrentColumnId(null);
//   };

//   const openUpdateForm = (task) => {
//     setCurrentTask(task);
//     setIsUpdateFormOpen(true);
//   };

//   const closeUpdateForm = () => {
//     setIsUpdateFormOpen(false);
//     setCurrentTask(null);
//   };

//   const addTask = (title, priority, dueDate) => {
//     const newTask = {
//       id: uuidv4(),
//       title,
//       priority,
//       dueDate,
//       columnId: currentColumnId,
//     };
//     setData((prevData) => ({
//       ...prevData,
//       tasks: [...prevData.tasks, newTask],
//     }));
//     toast.success("Task added successfully!");
//   };

//   const updateTask = (taskId, title, priority, dueDate) => {
//     setData((prevData) => ({
//       ...prevData,
//       tasks: prevData.tasks.map((task) =>
//         task.id === taskId ? { ...task, title, priority, dueDate } : task
//       ),
//     }));
//     toast.success("Task updated successfully!");
//   };

//   const deleteTask = (taskId) => {
//     setData((prevData) => ({
//       ...prevData,
//       tasks: prevData.tasks.filter((task) => task.id !== taskId),
//     }));
//     toast.error("Task deleted!");
//   };

//   const onDragEnd = (result) => {
//     const { source, destination } = result;

//     if (!destination) return;

//     if (source.droppableId === "done") {
//       if (source.droppableId !== destination.droppableId) {
//         toast.error("Completed tasks can't be moved back.");
//         return;
//       }
//       if (source.index !== destination.index) {
//         toast.error("Completed tasks can't be rearranged.");
//         return;
//       }
//     }

//     if (source.droppableId === destination.droppableId) {
//       const columnTasks = data.tasks.filter(
//         (task) => task.columnId === source.droppableId
//       );

//       const copiedItems = Array.from(columnTasks);
//       const [removed] = copiedItems.splice(source.index, 1);
//       copiedItems.splice(destination.index, 0, removed);

//       setData((prevData) => ({
//         ...prevData,
//         tasks: prevData.tasks.map((task) =>
//           task.columnId === source.droppableId
//             ? copiedItems.find((t) => t.id === task.id) || task
//             : task
//         ),
//       }));
//     } else {
//       const sourceTasks = data.tasks.filter(
//         (task) => task.columnId === source.droppableId
//       );
//       const destTasks = data.tasks.filter(
//         (task) => task.columnId === destination.droppableId
//       );

//       const [removed] = sourceTasks.splice(source.index, 1);
//       removed.columnId = destination.droppableId;
//       destTasks.splice(destination.index, 0, removed);

//       setData((prevData) => ({
//         ...prevData,
//         tasks: prevData.tasks.map((task) => {
//           if (task.id === removed.id) {
//             return { ...task, columnId: destination.droppableId };
//           }
//           if (task.columnId === source.droppableId) {
//             return sourceTasks.find((t) => t.id === task.id) || task;
//           }
//           if (task.columnId === destination.droppableId) {
//             return destTasks.find((t) => t.id === task.id) || task;
//           }
//           return task;
//         }),
//       }));
//     }
//   };

//   return (
//     <>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="kanban-board">
//           {data.columns.map((column) => (
//             <Column
//               key={column.id}
//               column={column}
//               tasks={data.tasks.filter((task) => task.columnId === column.id)}
//               addTask={openAddForm}
//               openUpdateForm={openUpdateForm}
//               deleteTask={deleteTask}
//             />
//           ))}
//           {isAddFormOpen && (
//             <AddTaskForm closeForm={closeAddForm} addTask={addTask} />
//           )}
//           {isUpdateFormOpen && (
//             <UpdateTaskForm
//               closeForm={closeUpdateForm}
//               updateTask={updateTask}
//               task={currentTask}
//             />
//           )}
//         </div>
//       </DragDropContext>
//       <ToastContainer />
//     </>
//   );
// };

// export default KanbanBoard;



import React, { useState } from "react";
import Column from "./Column";
import AddTaskForm from "./AddTaskForm";
import UpdateTaskForm from "./UpdateTaskForm";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialData = {
  tasks: [],
  columns: [
    { id: "to-do", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "qa-review", title: "QA-Review" },
    { id: "done", title: "Done" },
  ],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const openAddForm = (columnId) => {
    setCurrentColumnId(columnId);
    setIsAddFormOpen(true);
  };

  const closeAddForm = () => {
    setIsAddFormOpen(false);
    setCurrentColumnId(null);
  };

  const openUpdateForm = (task) => {
    setCurrentTask(task);
    setIsUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormOpen(false);
    setCurrentTask(null);
  };

  const addTask = (title, priority, dueDate) => {
    const newTask = {
      id: uuidv4(),
      title,
      priority,
      dueDate,
      columnId: currentColumnId,
    };
    setData((prevData) => ({
      ...prevData,
      tasks: [...prevData.tasks, newTask],
    }));
    toast.success("Task added successfully!");
  };

  const updateTask = (taskId, title, priority, dueDate) => {
    setData((prevData) => ({
      ...prevData,
      tasks: prevData.tasks.map((task) =>
        task.id === taskId ? { ...task, title, priority, dueDate } : task
      ),
    }));
    toast.success("Task updated successfully!");
  };

  const deleteTask = (taskId) => {
    setData((prevData) => ({
      ...prevData,
      tasks: prevData.tasks.filter((task) => task.id !== taskId),
    }));
    toast.error("Task deleted!");
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === "done") {
      if (source.droppableId !== destination.droppableId) {
        toast.error("Completed tasks can't be moved back.");
        return;
      }
      if (source.index !== destination.index) {
        toast.error("Completed tasks can't be rearranged.");
        return;
      }
    }

    if (source.droppableId === destination.droppableId) {
      const columnTasks = data.tasks.filter(
        (task) => task.columnId === source.droppableId
      );

      const copiedItems = Array.from(columnTasks);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setData((prevData) => ({
        ...prevData,
        tasks: prevData.tasks.map((task) =>
          task.columnId === source.droppableId
            ? copiedItems.find((t) => t.id === task.id) || task
            : task
        ),
      }));
    } else {
      const sourceTasks = data.tasks.filter(
        (task) => task.columnId === source.droppableId
      );
      const destTasks = data.tasks.filter(
        (task) => task.columnId === destination.droppableId
      );

      const [removed] = sourceTasks.splice(source.index, 1);
      removed.columnId = destination.droppableId;
      destTasks.splice(destination.index, 0, removed);

      setData((prevData) => ({
        ...prevData,
        tasks: prevData.tasks.map((task) => {
          if (task.id === removed.id) {
            return { ...task, columnId: destination.droppableId };
          }
          if (task.columnId === source.droppableId) {
            return sourceTasks.find((t) => t.id === task.id) || task;
          }
          if (task.columnId === destination.droppableId) {
            return destTasks.find((t) => t.id === task.id) || task;
          }
          return task;
        }),
      }));
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {data.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={data.tasks.filter((task) => task.columnId === column.id)}
              addTask={openAddForm}
              openUpdateForm={openUpdateForm}
              deleteTask={deleteTask}
            />
          ))}
          {isAddFormOpen && (
            <AddTaskForm closeForm={closeAddForm} addTask={addTask} />
          )}
          {isUpdateFormOpen && (
            <UpdateTaskForm
              closeForm={closeUpdateForm}
              updateTask={updateTask}
              task={currentTask}
            />
          )}
        </div>
      </DragDropContext>
      <ToastContainer />
    </>
  );
};

export default KanbanBoard;
