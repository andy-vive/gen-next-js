# gen-next-js
Generator next js for react server side rendering 

# Installation
```
npm install -g gen-next-js
```

#Usage
```
mkdir example
cd example
gen-next-js .
```

# Output directory structure
```
├── commons
│   ├── components
│   │   ├── index.js
│   │   └── Layout
│   │       ├── Body
│   │       │   └── index.js
│   │       ├── Header
│   │       │   ├── index.js
│   │       │   └── NavBar.js
│   │       └── index.js
│   ├── redux
│   │   └── index.js
│   └── utils
├── env-config.js
├── jest.config.js
├── jest.setup.js
├── modules
│   └── home
│       ├── home.action.js
│       ├── home.reducer.js
│       └── index.js
├── next.config.js
├── package.json
├── pages
│   ├── _document.js
│   └── index.js
├── postcss.config.js
├── server.js
├── services
│   └── sample.service.js
├── static
│   └── sample.css
└── test
```
# Authors

* **DuyPT**

# License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details