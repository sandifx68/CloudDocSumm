# AI Document summarizer built with Typescript with a NodeJS, Express and GCP backend and a React frontend.

### Features:
- Users can sign up and log in
- After logging in, users can upload a pdf they want summarized
- They can then click "Get Summary!" to get the summarized text
- Users can click a link in the summary page to download thier pdf that was originally used to create the summary
- Users can see a history of their summaries, sorted descendingly by date

### Implementations:
- functional NodeJS + Express backend with three requests: getSummary, getSummaries, createSummary
- Google cloud / Firebase features were used to store uploaded PDFs and also to manage authentication
- A React frotend was built in order to work with the backend built
- A pipeline was built to run frontend linting and tests automatically

### To do:
- dockerize and host the backend and frontend with cloud run