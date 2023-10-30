let gapi = window.gapi
let CLIENT_ID = process.env.REACT_APP__ID
let API_KEY = process.env.REACT_APP_CALENDAR_API_KEY

let DISCOVERY_DOCS=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
let SCOPES = "https://www.googleapis.com/auth/calendar.events"