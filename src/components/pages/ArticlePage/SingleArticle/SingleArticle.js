import React from 'react';
import PropTypes from 'prop-types';
import articleShape from '../../../../helpers/propz/articleShape';
import authRequests from '../../../../helpers/data/authRequests';

class SingleArticle extends React.Component {
  static propTypes = {
    article: articleShape.articleShape,
    passArticleToEdit: PropTypes.func,
    deleteSingleArticle: PropTypes.func,
  }

  deleteSingleArticle = (e) => {
    e.preventDefault();
    const { deleteSingleArticle, article } = this.props;
    deleteSingleArticle(article.id);
  }

  editArticle = (e) => {
    e.preventDefault();
    const { passArticleToEdit, article } = this.props;
    passArticleToEdit(article.id);
  }

  render() {
    const { article } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (article.uid === uid) {
        return (
        <div>
          <span className="col">
            <button className="btn btn-primary" onClick={this.editArticle}>
              Edit
            </button>
          </span>
          <span className="col">
            <button className="btn btn-secondary" onClick={this.deleteSingleArticle}>
              Delete
            </button>
          </span>
        </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="articleContainer card">
        <div className="singleArticle text-center mx-auto">
          <h3>{article.title}</h3>
          <h5>{article.synopsis}</h5>
          <h5>{article.url}</h5>
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default SingleArticle;
