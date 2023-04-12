import React from "react";
import Card from "react-bootstrap/Card";

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
    <Card >
      <div>
        <h1>{user.name}'s Templates</h1>
        {templates.map((template) => (
          <li key={template.name}>
            <h1 className="project-names">{template.name}</h1>
            {template.milestones
              .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
              .map((milestone) => (
                <Card  key={milestone.id}>
                  {milestone.name}
                  <br />
                  {milestone.leadTime} Days Before Due Date
                  <br />{" "}
                </Card>
              ))}
            <button className="normal" onClick={() => removeTemplate(template.id)}>
              Delete
            </button>{" "}
          </li>
        ))}
        <br />
      </div>
    </Card>
  );
}

export default TemplateIndex;