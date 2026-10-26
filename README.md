# MiniCRM

A Small CRM application that helps a business manage its leads. It uses AdonisJS for backend, with React and Tailwind on the frontend.

<img width="1905" height="965" alt="image" src="https://github.com/user-attachments/assets/29f2370e-4587-410e-8326-e3a6a0c5ee10" />


### 1. What provides

The app provides a built in authentication, with dashboard for CRUD operation on leads.
The dashboard presents a count of total number of leads, number of leads by status and a list of recently created leads.

The interface is already prepared for light and dark mode and smartphones screens, with the option to customize with custom colors, on the main css (inertia/css/app.css), with a option of using TailwindCSS.

<img width="1905" height="965" alt="image" src="https://github.com/user-attachments/assets/5dd1fbc4-17d7-4f2f-8b00-054080c2f758" />

<img width="1905" height="965" alt="image" src="https://github.com/user-attachments/assets/6e23cbf5-7b1f-426e-946e-ed811f862511" />


### 2. Data structure

The leads have the structure:

- Name: String
- Email: String
- Company: String
- Status: New, Contacted, Qualified, or Lost

### 3. How to install

Can only provide a 100% tutorial on Fedora 44. Other option should works the same way, but is could need extra steps 

##### Requirements
NodeJS v24.22.1 >

For fedora 44, install make and is dependecies: `sudo dnf install make gcc-c++ python3`

##### Guide

After installing NodeJS, go to project dir and do `npm install`
```cmd
cd MiniCRM
npm install
```
Now, create a env file based on .env.example and edit the file at your liking.

```cmd
cp .env.example .env
```

Open the file, and edit for your needs

Example
```
# Node
TZ=UTC
PORT=3333
HOST=localhost
NODE_ENV=production

# App
LOG_LEVEL=info
APP_KEY=
APP_URL=http://localhost:3333

# DB
DB_CONNECTION=sqlite
DB_DATABASE=tmp/db.sqlite3

# Session
SESSION_DRIVER=cookie
```

After that, use the command `node ace generate:key` to generate the APP_KEY on .env file

To create the tables for the database, use `node ace migration:run`, so that the app works correctly. 

Finally, run the next commands to build and run the app:

```cmd
npm run build
npm run start
```


# Disclaimer

Part of the code for interface was created with help of AI, but corrected and review by me.
All the data on the images are generated using a fabric and seeder provided by adonisjs framework


