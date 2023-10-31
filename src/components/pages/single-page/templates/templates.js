import React from "react";
import Card from "react-bootstrap/Card";
import List from 'react-bootstrap/ListGroup'
function TemplateIndex({ templates, setTemplates, user }) {
  const removeTemplate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/templates/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${sessionStorage.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete template");
      }

      const updatedTemplates = templates.filter((t) => t.id !== id);
      setTemplates(updatedTemplates);
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  return (
    <Card className="template-list">
      <div id='template.id' className="template-container">
        <h1 className="template-headline">My Templates</h1>
        <br />
        {templates.map((template) => (
          <div key={template.id} className="template-info">
            <h1 className="project-names">{template.name}</h1>
            {template.milestones
              .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
              .map((milestone, index) => (
                <Card key={milestone.id} className="milestone-card">
                  <div className="milestone-info">
                    <p>{index + 1} {milestone.name} {milestone.leadTime} Days Before Due Date</p>
                  </div>
                  <br />
                </Card>
              ))}
            <button className="normal" onClick={() => removeTemplate(template.id)}>
              Delete
            </button>{" "}
          </div>
        ))}
        <br />
      </div>
    </Card>
  );
  
}

export default TemplateIndex;