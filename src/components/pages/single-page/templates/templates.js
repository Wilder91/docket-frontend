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
        <h1>{user.name}'s Templates</h1>
        {templates.map((template) => (
          <List  key={template.id}>
            <h1 className="project-names">{template.name}</h1>
            {template.milestones
              .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
              .map((milestone) => (
                <Card  key={milestone.id}>
                  <Card.Text className="template-details"> {milestone.name} {milestone.leadTime} Days Before Due Date</Card.Text>
          
                
                  <br />{" "}
                </Card>
              ))}
            <button className="normal" onClick={() => removeTemplate(template.id)}>
              Delete
            </button>{" "}
          </List>
        ))}
        <br />
      </div>
    </Card>
  );
}

export default TemplateIndex;