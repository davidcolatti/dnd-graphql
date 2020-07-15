import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./contactlist.css";

const ContactList = ({ contacts }) => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  function onDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;
    const selectedContact = contactList[source.index];
    const movedContact = contactList[destination.index];

    let copiedList = [...contactList];
    copiedList.splice(destination.index, 1, selectedContact);
    copiedList.splice(source.index, 1, movedContact);

    setContactList(copiedList);
  }

  return (
    <div className="container">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className="column">
          <h2>Contacts</h2>

          <div className="column-inner">
            <Droppable droppableId="dp1">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="column-list"
                  >
                    {contactList.map((item, index) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="drag-item"
                                style={{
                                  backgroundColor: snapshot.isDragging
                                    ? "#263B4A"
                                    : "#456C86",
                                  color: "white",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <p>{`${item.name} lives in ${item.city}, ${item.state}`}</p>
                                <a className="edit-btn" href="/">
                                  Edit
                                </a>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ContactList;
