import fetch from 'isomorphic-fetch';

export default {
  getTickets () {
    return fetch('/api/ticket', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err, 'There was an error getting the tickets!'));
  },
  getTicket(id) {
    return new Promise((resolve, reject) => fetch(`/api/ticket/${id}`)
      .then(response => response.json()
      .then(json => resolve(json)))
      .catch(err => reject(err)));
  },
  searchTickets(term) {
    return new Promise((resolve, reject) => fetch(`/api/ticket/search=${term}`)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(err => reject(err)));
  },
  createTicket(ticket) {
    return new Promise((resolve, reject) => fetch('/api/ticket', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(ticket)
    })
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(err => reject(err)));
  },
  submitNewTicket () {
    return fetch('http://localhost:3000/api/ticket', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: document.getElementById('title').value,
        issuePreview: document.getElementById('issue').value.slice(0, 50),
        issue: document.getElementById('issue').value,
        customerId: document.getElementById('customerId').value,
        product: document.getElementById('product').value,
        solution: document.getElementById('solution').value,
        relatedArticles: document.getElementById('relatedArticles').value,
        relatedProducts: document.getElementById('relatedProducts').value,
        resolved: true,
        authorId: JSON.stringify(Math.floor(Math.random * 1000)),
        dateSubmitted: new Date(),
        datesOpened: new Date(),
        checkedOut: true
      })
    })
    .then(res => res.json())
    .catch(err => console.log(err, 'There was an error while submitting the ticket!'));
  },
  putTicket (ticket) {
    return new Promise((resolve, reject) => fetch(`/api/ticket/${ticket.id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(ticket)
    })
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(err => reject(err)));
  },
  editTicket (ticketId) {
    return fetch(`http://localhost:3000/api/ticket/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: document.getElementById(`editTitle${ticketId}`).value,
        issuePreview: document.getElementById(`editIssue${ticketId}`).value.slice(0, 50),
        issue: document.getElementById(`editIssue${ticketId}`).value,
        customerId: document.getElementById(`editCustomerId${ticketId}`).value,
        product: document.getElementById(`editProduct${ticketId}`).value,
        solution: document.getElementById(`editSolution${ticketId}`).value,
        relatedArticles: document.getElementById(`editRelatedArticles${ticketId}`).value,
        relatedProducts: document.getElementById(`editRelatedProducts${ticketId}`).value,
        authorId: JSON.stringify(Math.floor(Math.random * 1000)),
        datesOpened: new Date(),
        checkedOut: true
      })
    })
    .then(res => res.json())
    .catch(err => console.log(err, 'There was an error while editing the ticket!'));
  },
  deleteTicket (ticketId) {
    return fetch(`http://localhost:3000/api/ticket/${ticketId}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => console.log(err, 'There was an error while deleting the ticket!'));
  }
};
