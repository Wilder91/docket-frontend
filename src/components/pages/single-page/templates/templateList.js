import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import EditTemplate from "./editTemplate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TemplateIndex({ templates, setTemplates, user }) {
  const [showEditTemplateModal, setShowEditTemplateModal] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);

  const openEditTemplateModal = (template) => {
    setTemplateToEdit(template);
    setShowEditTemplateModal(true);
  };

  const closeEditTemplateModal = () => {
    setShowEditTemplateModal(false);
  };

  return (
    <Card className="template-list">
      <br />
      <div id="template.id" className="Card">
        <h1 className="template-headline">My Templates</h1>
        <br />
        {templates.map((template) => (
          <div key={template.id} className="template-info">
            <h1 className="project-names">{template.name}</h1>
            <btn
              className="normal"
              onClick={() => openEditTemplateModal(template)}
            >
              Edit
            </btn>
            <br />
            <br />
            <div className="milestones-container">
              {template.milestones
                .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
                .map((milestone, index) => (
                  <Card key={milestone.id} className="milestone-card">
                    <div className="milestone-info">
                      <p>
                        {index + 1}. {milestone.name} {milestone.leadTime} Days Before Due Date
                      </p>
                    </div>
                    <br />
                  </Card>
                ))}
            </div>
          </div>
        ))}
        <br />
      </div>

      <Modal show={showEditTemplateModal} onHide={closeEditTemplateModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Template</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <EditTemplate
  templates={templates}
  setTemplates={setTemplates}
  user={user}
  templateToEdit={templateToEdit}
  show={showEditTemplateModal}
  onHide={closeEditTemplateModal}
  setShowEditTemplateModal={setShowEditTemplateModal}
/>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeEditTemplateModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </Card>
  );
}

export default TemplateIndex;
