# Niki Vecek IWH I Practicum

This is my practicum repository for the **Integrating With HubSpot I: Foundations** certification course.

## Custom Object

I created a custom object called **Books**, associated with the Contacts object, with the following custom properties:

- `name` (single-line text) — the book's title
- `author` (single-line text)
- `genre` (single-line text)

Link to the list view of the custom object:
https://app-eu1.hubspot.com/contacts/149131019/objects/2-252096418/views/all/list

## Running this app

1. Run `npm install` to install dependencies.
2. Copy `.env.example` to `.env` and fill in:
   - `PRIVATE_APP_ACCESS` — your private app's access token
   - `CUSTOM_OBJECT_TYPE` — your custom object's fully-qualified name or object type ID (e.g. `books` or `2-12345678`)
3. Run `node index.js` and open `http://localhost:3000`.

## Routes

- `GET /` — homepage, retrieves and displays all Book records in a table
- `GET /update-cobj` — renders a form to create a new Book record
- `POST /update-cobj` — creates a new Book record from the submitted form data, then redirects to the homepage
