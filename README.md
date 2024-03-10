## this code is maintaining the version of document so that other one can't manululates the other person changes , if he tries it chage the changes of other it will raise conflicts 

editor api 



Creating a document → User creates the first draft version of the document.

curl -X POST -H "Content-Type: application/json" -d '{"title":"Document Title", "content":"Document Content", "creatorId":"user123"}' http://localhost:3000/create




Creating a second draft version of a given document.
curl -X POST -H "Content-Type: application/json" -d '{"content":"Updated Content", "lastUpdateAuthorId":"user456", "version":1}' http://localhost:3000/create-version/fb426437-099e-47b5-a26f-86a918535532




Updating an existing draft version
curl -X POST -H "Content-Type: application/json" -d '{"content":"New Updated Content", "lastUpdateAuthorId":"user789", "version":3}' http://localhost:3000/update/4fa5f40c-5ba3-49b2-8a12-205ae62f3c70ontent":"New Updated Content", "lastUpdateAuthorId":"user789", "version":3}' http://localhost:3000/update/fb426437-099e-47b5-a26f-86a918535532





Publishing a document → User chooses to publish a draft version of a document.
This version becomes the (only) published version and replaces any previous
published version of that document. This version should start to be served by the
Content Serving API.
curl -X POST -H "Content-Type: application/json" http://localhost:3000/publish/4fa5f40c-5ba3-49b2-8a12-205ae62f3c70







Seeing available draft and published versions of a document → User chooses is
able to see the history of a document.
curl http://localhost:3000/all-versions






content serving api 






Content Serving API
The content serving API serves the last publication of each document.
curl http://localhost:3001/published-versions





It can also accept a document ID and serve the last publication of this single document.
curl http://localhost:3001/last-published/4fa5f40c-5ba3-49b2-8a12-205ae62f3c70






npx ts-node content.ts
npx ts-node editor.ts
