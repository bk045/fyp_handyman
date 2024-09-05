# HANDYMAN SERVICES NEPAL
This application was developed to fulfill the requirement of Final Year Individual Project of BSc. Computing (Hons).
Application serves as a platform for requesting various handyman services. It also offers a platform to chat with the 
connected service provider and customers.
### Techonoligies Used
1. Django
2. React
3. PostgreSQL 
## STARTING THE APPLICATION
### Pre-requesites
1. Docker with Docker Compose
2. Web-browser
### Steps:
1. In terminal run command **>>docker compose up**
2. Open another terminal or tab and run command **>>docker ps**. Identify the NAME or ID of the ***backend container***. Not ***database container***. This will be used in next command.
3. Run **docker exec -it [NAME or ID of backend container] python manage.py createsuperuser** and follow the instructions to create a superuser and password to login.
4. Copy **http://0.0.0.0:3000** and paste in the browser.