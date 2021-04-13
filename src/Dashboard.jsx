import React from "react";
import {
  Toasts,
  NotificationState,
  NotificationStatus
} from "@codesandbox/notifications";
import ContactTable from "./components/ContactTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

const state = new NotificationState();

state.addNotification({
  sticky: true,
  title: "Test Notification 1",
  message: "This is a notification",
  status: NotificationStatus.NOTICE
});

function Dashboard() {
  return (
    <div className="App">
      <Container>
        <ContactTable />
      </Container>
      <Toasts state={state} />
      <React.Fragment>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Someone"
          subtitle="Type a Message"
        />
      </React.Fragment>
    </div>
  );
}

export default Dashboard;
