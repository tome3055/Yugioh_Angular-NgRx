import express, { Request, Response } from 'express';
import { RegisterRequestInterface } from './types/registerRequest';
import cors from 'cors';
import { ReturnUser } from './types/returnUser';
import fs from 'fs';
import { CardInterface } from './types/Card';


fs.readFile('carddata/carddatatemp.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // The file contents are stored in the 'data' variable
  const jsonContent = JSON.parse(data);

  // Now you can work with the JSON data
  const simplifiedJson: CardInterface = {
    data: jsonContent.data.map((card) => ({
      id: card.id,
      name: card.name,
      type: card.type,
      desc: card.desc,
      image_url: card.card_images[0].image_url
    }))
  };
  console.log(simplifiedJson);
});

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.post('/api/register', (req: Request<{}, {}, RegisterRequestInterface>, res: Response) => {
  const { user } = req.body;
  console.log(user);

  if (user && user.username && user.password && user.email) {
    const currentUser: ReturnUser = {
      user: {
        id: '123',
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        username: user.username,
        bio: null,
        image: null,
        token: 'abcd1234'
      }
    };

    console.log(currentUser);

    res.status(200).json(currentUser);
  } else {
    const errors = {
        errors: {
            message: ['Invalid request']
          }
    }
    console.log(errors);
    res.status(422).json(errors);
  }
});

app.post('/api/login', (req: Request<{}, {}, RegisterRequestInterface>, res: Response) => {
  const { user } = req.body;
  console.log(user);

  if (user && user.username && user.password) {
    const currentUser: ReturnUser = {
      user: {
        id: '123',
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        username: user.username,
        bio: null,
        image: null,
        token: 'abcd1234'
      }
    };

    console.log(currentUser);

    res.status(200).json(currentUser);
  } else {
    const errors = {
        errors: {
            message: ['Invalid request']
          }
    }
    console.log(errors);
    res.status(422).json(errors);
  }
});

app.post('/api/cards', (req: Request, res: Response) => {
  const { data } = req.body;
  console.log(req.body);
  
  var user = false;

  if (user) {
    const tempreturn: any = {
      user: {
        data: '123'
      }
    };

    console.log(tempreturn);

    res.status(200).json(tempreturn);
  } else {
    const errors = {
        errors: {
            message: ['Invalid request']
          }
    }
    console.log(errors);
    res.status(422).json(errors);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});