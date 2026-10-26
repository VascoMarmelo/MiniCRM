# MiniCRM

A Small CRM application that helps a business manage its leads. It uses AdonisJS for backend, with React and Tailwind on the frontend.

//Home page

### What provides

The app provides a built in authentication, with dashboard for CRUD operation on leads.
The dashboard presents a count of total number of leads, number of leads by status and a list of recently created leads.

The interface is already prepared for dark mode and smartphones screens, with the option to customize with custom colors, on the main css (inertia/css/app.css), with a option of using TailwindCSS.

### Data structure

The leads have the structure:

<li>
    <ul>Name: String</ul>
    <ul>Email: String</ul>
    <ul>Company: String</ul>
    <ul>Status: New, Contacted, Qualified, or Lost</ul>
</li>


