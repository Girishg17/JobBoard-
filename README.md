## Installation
1. clone the repo using `git clone https://github.com/Girishg17/JobBoard-.git`
2. go to the Job Board folder and run `npm install`
3. After that bring up MySQL on local on `3306` port & make sure username is `root` and password is empty. if not then change it in `router.ts` file.
4. Then try command `mysql -u <username> -p` this will open MariaDB command prompt.
5. In MariaDB CLI try ` source <path to setup.sql>` eg: `source C:\Users\admin\Desktop\job Board\src\setup.sql`
6. When MySQL is brought up try running `npm start`.
7. Now Your application should be up and running on `http://localhost:3000`.💐🎉🎉
8. Now you can test your application using swagger UI on the url `http://localhost:3000/api-docs/#/`
