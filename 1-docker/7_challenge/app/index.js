import express from 'express';
import { faker } from '@faker-js/faker';
import People from './peopleModel.js';

const app = express();

app.get('/', async (_, res) => {
    const people = new People()
    people.create(faker.person.fullName());

    const results = await people.all();
    
    res.send(`
        <ul>
            ${results.map(result => `<li>${result.name}</li>`).join('')}
        </ul>
    `);

    people.close();
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});