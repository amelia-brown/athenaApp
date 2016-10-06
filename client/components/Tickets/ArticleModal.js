import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle } from '../../actions';

const ArticleModal = ({ dispatch, article }) => {
  const handleToggle = (article) => {
    dispatch(getArticle(article.id));
  }
  return (
    <div>
      <button
        onClick={e => {
          e.preventDefault();
          handleToggle(article);
        }} >
        Close</button>
      <h3>{article.title}</h3>
      <div className="content">
        <strong>Issue:</strong>
        {article.issue}<br /><br />
        <strong>Solution:</strong>
        {article.solution}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    article: state.articleDisplay
  }
}

const FullArticle = connect(
  mapStateToProps
)(ArticleModal);

export default ArticleModal;