import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import AddContactModal from "./AddContactModal";
import EditContactModal from "./EditContactModal";

class ContactTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModal: false,
      showEditModal: false,
      currentEditIndex: null,
      contactList: [
        {
          id: 1,
          name: "John",
          gender: 0,
          phone: 85589653
        },
        {
          id: 2,
          name: "Karen",
          gender: 1,
          phone: 85589621
        }
      ]
    };
  }

  getGender = (genderId) => {
    return genderId === 0 ? "Male" : "Female";
  };

  /* Show or Hide "Add Contact Modal" */
  handleToggleAddModal = (showState) => {
    this.setState({ showAddModal: !showState });
  };

  /* Show or Hide "Edit Contact Modal", */
  /* also attach target contact id for updating. */
  handleToggleEditModal = (showState, id = null) => {
    const index = id !== null ? --id : null;
    this.setState({
      showEditModal: !showState,
      currentEditIndex: index
    });
  };

  /* Handle modals hiding if user press area outside of popup modal */
  handleHideModal = (sourceComponent) => {
    sourceComponent === 1
      ? this.setState({
          showAddModal: false
        })
      : this.setState({
          showEditModal: false
        });
  };

  handleDeleteContact = (id) => {
    const contactList = this.state.contactList.filter(
      (contact) => contact.id !== id
    );
    // Sort contact list ids after deleting contact.
    // Prevent non-continuous "No." displayed in contact table.
    contactList.forEach(function (contact, index) {
      contactList[index].id = index + 1;
    });
    console.log(contactList);
    this.setState({ contactList });
  };

  /* Handle adding contact, calling from AddContactModal component. */
  handleAddContact = (contact) => {
    const contactList = this.state.contactList;

    // Check if current contact list is empty.
    // Continue id if yes, else start id with 1.
    if (contactList.length > 0) {
      let id = contactList[contactList.length - 1].id;
      contact.id = ++id;
    } else {
      contact.id = 1;
    }
    contactList.push(contact);
    this.setState({ contactList, showAddModal: false });
  };

  /* Handle updating contact, calling from EditContactModal component. */
  handleEditContact = (contact) => {
    const contactList = this.state.contactList;
    const targetContactIndex = contactList.findIndex(
      (c) => c.id === contact.id
    );
    contactList[targetContactIndex] = contact;
    this.setState({ contactList, showEditModal: false });
  };

  render() {
    // Object destructuring from this.state
    const {
      showAddModal,
      showEditModal,
      contactList,
      currentEditIndex
    } = this.state;
    return (
      <div style={{ marginTop: "1rem" }}>
        <h3>Contact List</h3>
        <Button
          variant="primary"
          className="m-2"
          size="sm"
          onClick={() => this.handleToggleAddModal(showAddModal)}
        >
          Add
        </Button>
        <Table hover bordered responsive style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Rendering contact list data into table*/}
            {contactList.map((contact) => (
              <tr key={contact.id}>
                <td style={{ width: "5%" }}>{contact.id}</td>
                <td style={{ width: "15%" }}>{contact.name}</td>
                <td style={{ width: "10%" }}>
                  {this.getGender(contact.gender)}
                </td>
                <td style={{ width: "15%" }}>{contact.phone}</td>
                <td style={{ width: "25%" }}>
                  <Button
                    variant="success"
                    className="m-2"
                    size="sm"
                    onClick={() =>
                      this.handleToggleEditModal(showEditModal, contact.id)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="m-2"
                    size="sm"
                    onClick={() => this.handleDeleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add contact modal, with Add contact form. */}
        <AddContactModal
          show={showAddModal}
          onToggleAddModal={this.handleToggleAddModal}
          contactList={contactList}
          onAddContact={this.handleAddContact}
          onHideModal={this.handleHideModal}
        />

        {/* Edit contact modal, with edit contact form. */}
        <EditContactModal
          show={showEditModal}
          onToggleEditModal={this.handleToggleEditModal}
          currentEditContact={contactList[currentEditIndex]}
          contactList={contactList}
          onEditContact={this.handleEditContact}
          onHideModal={this.handleHideModal}
        />
      </div>
    );
  }
}

export default ContactTable;
