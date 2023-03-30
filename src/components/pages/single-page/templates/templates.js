import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";

function TemplateIndex({ templates, setTemplates, user}) {
  function removeTemplate(id) {
    fetch(`http://localhost:3000/templates/${id}`, { 
      method: 'DELETE', 
      headers: new Headers({
        Authorization: `${sessionStorage.token}`,
      }) 
    })
      .then(() => {
        const updatedTemplates = templates.filter((t) => t.id !== id);
        setTemplates(updatedTemplates);
      })
      .catch((error) => {
        console.error('Error deleting template:', error);
      });
  }
  useEffect(() => {
    console.log(templates, user);
  }, [templates, user]);

  return (
    <Card style={{ background: "none", border: "none", display: "inline", maxHeight: '5px', overflowY: "clip" }}>
    <div>

    
      <h1>{user.name}'s Templates</h1>
      
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
                removeTemplate(template.id);
              }}
            >
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