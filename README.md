# SlackBot
Slack bot that tells its users the time and weather for a certain location

# To start the application
1. clone the project into your local repo
2. cd into iris folder
3. type `npm start`
4. open another terminal 
5. cd into iris-time 
6. type `npm start`
7. check iris console. The console should display the service port
8. repeat steps 4 to 7 for iris-weather

# prerequisites
1. create three .env files each file located in the root of the iris folders
2. enter a client token  and bearer token in main iris application 
3. client token is retrieved from the slack web-api
4. bearer token in retrieved from the wit.ai nlp API
e.g. in the root of iris .env
```
CLIENTTOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXX
BEARERTOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXX
```
in the .env file of iris-time and iris-weather
```
APIKEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
