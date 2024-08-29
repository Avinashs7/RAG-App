<h1 align="center">
  <a href="https://github.com/Avinashs7/RAG-App">RAG-app<img src="![image](https://github.com/user-attachments/assets/d42732a8-e47f-4136-b5b6-90c92b4cebbc)"></a>
</h1>
<p align="center">
<strong><i>Tech Stack : MongoDB-atlas, ExpressJS, NodeJS</i></strong>
</p>

> This application is designed for document retrieval and augmented generation using advanced AI models. The core functionality revolves around storing document embeddings in FaissStore, performing similarity checks to retrieve contextually relevant documents, and generating responses from a language model.

> The chat thread is stored in MongoDB, while the document embeddings are stored as vectors in the local file structure.

> Augmentation based on the retrieved context is achieved through the Cohere API, which facilitates communication with the language model.


## Clone or Download
```terminal
$ git clone https://github.com/Avinashs7/RAG-App
$ npm i
```

## project structure
```terminal
node_modules
src
  index.js
package.json
package-lock.json
.env (to create .env, refer [.env.sample])
...
```

# Usage

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^18.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

## Server(PORT: 8000)

### Prepare your .env

Add cohere API key
MongoDB URI
PORT 

## BUGs or comments

[Create new Issues](https://github.com/Avinashs7/RAG-App/issues) (preferred)

### Mail:
<ul>
  <li>
    <a href='mailto:07avinash.s@gmail.com'>07avinash.s@gmail.com</a> 
  </li>
</ul>


## Author
  ### Connect with me on LinkedIn to explore collaboration opportunities for projects and professional work.
 - [Avinash S](https://www.linkedin.com/in/avinash-s007)
