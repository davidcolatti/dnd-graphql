import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import "./contactlist.css";
import { UPDATE_CONTACT } from "../../api/mutations";
import { useMutation } from "@apollo/client";

const ContactList = ({ contacts }) => {
  const [contactList, setContactList] = useState([]);
  const [updateContact] = useMutation(UPDATE_CONTACT);

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  function onDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;

    const copiedList = [...contactList];
    const [removed] = copiedList.splice(source.index, 1);
    copiedList.splice(destination.index, 0, removed);

    updateContact({
      variables: {
        id: result.draggableId,
        destinationIdx: destination.index,
        sourceIdx: source.index,
      },
    });

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

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};
export default ContactList;
