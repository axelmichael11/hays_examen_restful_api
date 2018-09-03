# hays_examen_restful_api


# To Run the Program...

1. install npm
2. npm i
3. install mongodb
    With Homebrew, this is easy...
    homebrew install mongodb
4. "sudo mongodb" in one terminal to run the database...
5. "mongo" in a new terminal to open the database shell...
6. "npm run start" in a new terminal to run the api...


# To Measure scalability...

# Setup NGIX

1. Install ngix with homebrew...

2. 

#Setup PM2
1. install pm2 "npm i pm2" or preferred globally
2. NEW TERMINAL  - run "pm2 monitor" to see logs and processes.
3. NEW TERMINAL - Start four processess with ports (MUST be greater than 1024 unless super user)...

"
pm2 start index.js -- 1111
pm2 start index.js -- 2222
pm2 start index.js -- 3333
pm2 start index.js -- 4444
"

4. NEW TERMINAL - Application output with
"pm2 show 0"
───┐
│ Name  │ mode │ status │ ↺   │ cpu │ memory    │
├───────┼──────┼────────┼─────┼─────┼───────────┤
│ index │ fork │ online │ 777 │ 0%  │ 72.6MB   │
└───────┴──────┴────────┴─────┴─────┴───────────┘

5. To enable cluster mode... run

"
pm2 start index.js -i max
"



4. "pm2 list" to measure cpu...






#To do List

- [x] hotel json data to the database
    - {x} upload data on api server start... POST
        - |x| tests

- [X] Upload hotel picture data to the database
    - {x} upload data on api server start... POST
        - |x| tests

- ROUTES
- [] 
    - {} send data from database GET
        - || tests
    

- Scalability
- []
    - {} install NGIX reverse proxy
    - {} idea of clusters for nodejs...



