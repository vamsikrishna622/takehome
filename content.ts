import Koa from 'koa';
import Router from 'koa-router';
import axios from 'axios';

const app = new Koa();
const router = new Router();

interface Document {
  id: string;
  title: string;
  content: string;
  creatorId: string;
  creationDate: Date;
  lastUpdatedDate: Date;
  lastUpdateAuthorId?: string;
  isPublished?: boolean;
  versions?: Version[];
}

// Define Version interface
interface Version {
  content: string;
  lastUpdateAuthorId: string;
  lastUpdatedDate: Date;
}

const editorApiUrl = 'http://localhost:3000'; 
router.get('/published-versions', async (ctx) => {
 
  try {
    const response = await axios.get(`${editorApiUrl}/all-versions`);
 
    const documents: Record<string, Document[]> = response.data;

    const publishedVersions: { id: string; title: string; lastUpdatedDate: Date }[] = [];

    
      for (const doc of response.data) {
        if (doc.isPublished) {
          publishedVersions.push({
            id: doc.id,
            title: doc.title,
            lastUpdatedDate: doc.lastUpdatedDate,
          });
        }
      }
    

    ctx.body = publishedVersions;
  } catch (error) {
    console.error('Error fetching published versions:', error);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

router.get('/last-published/:id', async (ctx) => {
  const { id } = ctx.params;
  console.log('Fetching last published document with ID:', id);

  try {
    const response = await axios.get(`${editorApiUrl}/versions/${id}`);
    const document: Document[] = response.data;



    console.log('Last Published Document:', document[0]);
    ctx.body = document[0];
  } catch (error) {
    console.error('Error fetching last published document:', error);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

app.use(router.routes());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Content Serving API running on port ${PORT}`);
});
