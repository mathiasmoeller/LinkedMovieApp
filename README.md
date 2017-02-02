# Linked Movie App

This is an university project for the lecture *Semantic Web & Linked Data*.

The goal was to utilize Semantic Web technologies. We decided to built an app that allows you to create a graph similar to the [Google Knowledge Graph](https://www.google.com/intl/bn/insidesearch/features/search/knowledge.html) based on the movie data on [LinkedMDB](http://www.linkedmdb.org/).

### Technologies
- [vue.js](http://visjs.org/)
- [Material Design Lite](https://getmdl.io/)

### Temporal fixes
As long as LinkedMDB is down we query a local blazegraph endpoint. You have to set up the endpoint using the [LinkedMDB Dump](http://www.cs.toronto.edu/~oktie/linkedmdb/). As blazegraph does not support CORS or JsonP you have to start your browser without websecurites (`google-chrome --disable-web-security --user-data-dir=/someDir/`).
When LinkedMDB is back replace the query call in `sparql-endpoint.js` with the jsonP call.