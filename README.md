<h1>Postgresql App</h1>
<h2>Project Overview</h2>
<p>
    This application allows users to create, edit and manage their tasks as well as job processes easily. It offers the following features:
    <ul>
        <li>Personalised Tasks and Job Management through authentication</li>
        <li>Manage, Add, Delete and Update as much tasks and jobs as you want</li>
    </ul>
</p>

<h2>Technologies Stack</h2>
<ul>
    <li>
        <h3>Frontend: React, Ant Design</h3>
        <p>
            The frontend of the application is made using React and components of Ant Design. It includes components like user authentication pannel, task manager page, and job manager page.
        </p>
    </li>
    <li>
        <h3>Backend: Express.js</h3>
        <p>
           The Backend of the application is made using Node and Express. The backend includes
           <ol>
                <li> APIs for user registration, tasks and jobs CRUD operations and fetching data for different componenets.</li>
                <li> Models of Users, tasks and jobs </li>
                <li> Sequelize for connecting models with the database</li>
                <li> Bcrypt to ensure password safety</li>
                <li> JWT for secure authentication</li>
           </ol>
        </p>
    </li>
    <li>
        <h3>Database: PostgreSQL</h3>
        <p>
            PostgreSQL is used to store the users metadata and list of tasks and jobs associated with them. Sequelize is used to communicate between database and backend.
        </p>
    </li>
</ul>

<h2>Installation</h2>

<h3>Pre-requisites</h3>
    <ul>
        <li>Please make sure you have suitable Node.js version in your pc</li>
        <li>Node depenedencies will be installed through package.json.</li>
        <li>Setting up the project includes frontend, backend and database. Please refer to the original documentation provided along in case of any issue.</li>
    </ul>

<h3>Setting up the project</h3>

1. Clone the repository

```bash
git clone https://github.com/mohitdixit02/postgresql-app.git
```

2. Open the project in terminal and install the frontend dependencies

```bash
cd postgresql-app/frontend
npm i
```

3. Similary install the backend dependencies

```bash
cd ../backend
npm i
```

4. Start the backend server

```bash
node index.mjs
```

5. In case you have nodemon and want to start the development server, you can directly use below command to invoke it.
```bash
npm run dev
```

<h3>Setting up environment variables</h3>

Both frontend and backend have ```.env.example``` file. Set up your own ```.env``` by referring to it.
Frontend env requires backend url while Backend env requires database credentials, jwt key, client url and environment.
Use following if you want to set development mode and enable logging behaviour of sequelize:
```NODE_ENV = 'development'```

<h3>Setting up the database</h3>

Please download the database from official website and follow the doucmentation to start database service in your local machine. If you have database online, use its credentials in the ```.env``` to connect with the database.
Before starting the server make sure the database entered in ```DB_DATABASE``` is actually present before.

<h2>Documentation and Links to refer</h2>
<ol>
  <li>PostgreSQL: https://www.postgresql.org/</li>
  <li>Sequelize: https://sequelize.org/</li>
  <li>Node.js: https://nodejs.org/</li>
  <li>Express.js: https://expressjs.com/</li>
  <li>React: https://react.dev/</li>
  <li>AntD: https://ant.design/</li>
  <li>Bcrypt: https://www.npmjs.com/package/bcrypt</li>
  <li>JWT: https://www.npmjs.com/package/jsonwebtoken</li>
</ol>

<h2>Suggestions</h2>
I am happy for any suggestions or improvements. Feel free to open an issue or pull request.
or you can email me on: mohit.vsht@gmail.com

Thanks !!
<h3>Mohit Sharma</h3>
