import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";

function TemplateIndex({ templates, user, deleteTemplate }) {
  useEffect(() => {
    console.log(templates, user);
  }, [templates, user]);

  return (
    <div>
      <h1>{user.name}'s Templates</h1>
      <Card style={{ background: "none", border: "none", display: "inline" }}>
        {templates.map((template) => (
          <li key={template.name}>
            <h1 className="project-names">{template.name}</h1>
            {template.milestones
              .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
              .map((milestone) => (
                <Card className="card-body" key={milestone.id}>
                  {milestone.name} {milestone.lead_time} Days Before Due Date
                  <br />{" "}
                </Card>
              ))}
            <button
              className="normal"
              onClick={() => {
                deleteTemplate(template.id);
              }}
            >
              Delete
            </button>{" "}
          </li>
        ))}
        <br />
      </Card>
    </div>
  );
}

export default TemplateIndex;