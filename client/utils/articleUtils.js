import fetch from 'isomorphic-fetch';
const api = 'http://localhost:3000';

const articleUtils = {
  getArticles: () => new Promise((resolve, reject) => {
    return fetch(api + '/api/kb',
                 {mode: 'no-cors'})
      .then(response => {
        return response
          .json()
          .then(json => {
            resolve(json)
          })
        })
        .catch(err => reject(err));
  }),
  getArticlesByIds: (idArray) => {
    return fetch(api + '/api/kb/articles', {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ids: idArray})
    })
      .then((response) => {
        return response.json().then(json => json);
      })
      .catch(err => console.log(err));
  },
  getArticle: (id) => new Promise((resolve, reject) => {
    return fetch(api + `/api/kb/${id}`,
                 {mode: 'no-cors'})
      .then((response) => {
        return response
          .json()
          .then(json => {
            resolve(json)
         })
        .catch(err => reject(err));
      })
  }),
  searchArticles: (term) => new Promise((resolve, reject) => {
    return fetch(api + `/api/kb/search=${term}`,
                 {mode: 'no-cors'})
      .then((response) => {
        console.log(response);
        return response
          .json()
          .then(json => {
            resolve(json)
          })
      .catch(err => reject(err));
    })
  }),
  postArticle: (article) => new Promise((resolve, reject) => {
    return fetch(api + '/api/kb', {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(article)
    })
      .then((response) => {
        return response.json()
          .then(json => {
            resolve(json);
        })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    })
  }),
  editArticle: (article) => new Promise((resolve, reject) => {
    console.log(JSON.stringify(article))
    return fetch(api + `/api/kb/${article.id}`, {
      method: 'PUT',
      mode: 'no-cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(article)
    })
      .then((response) => {
        return response.json()
          .then(json => {
            console.log('this is the response: ',json);
            resolve(json)
          })
      })
      .catch(err => reject(err));
  }),
  deleteArticle: (id) => new Promise((resolve, reject) => {
    return fetch(api + `/api/kb/${id}`, {
      mode: 'no-cors',
      method: 'DELETE',
    })
      .then((response) => {
        return response.json()
          .then(json => {
            resolve(json)
          })
      .catch(err => reject(err));
    })
  }),
}

export default articleUtils;
