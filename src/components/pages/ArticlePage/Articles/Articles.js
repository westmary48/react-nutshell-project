import React from 'react';
import 'firebase/auth';
import smashRequests from '../../../../helpers/data/smashRequests';
import './Articles.scss';
import authRequests from '../../../../helpers/data/authRequests';
import SingleArticle from '../SingleArticle/SingleArticle';
import ArticleForm from '../ArticleFrom/ArticleForm';
import articleRequests from '../../../../helpers/data/articleRequests';

class Article extends React.Component {
  state = {
    articles: [],
    isEditing: false,
    editId: '-1',
  }

  getArticles = () => {
    const currentUid = authRequests.getCurrentUid();
    smashRequests.getArticlesFromMeAndFriends(currentUid)
      .then((articles) => {
        this.setState({ articles });
      })
      .catch((error) => {
        console.error('error on getArticlesFromMeAndFriends', error);
      });
  }

  componentDidMount() {
    this.getArticles();
  }

  formSubmitArticle = (newArticle) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      articleRequests.updateArticle(editId, newArticle)
        .then(() => {
          this.getArticles();
          this.setState({ isEditing: false, editId: '-1' });
        })
        .catch(err => console.error('error with articles post', err));
    } else {
      articleRequests.postRequest(newArticle)
        .then(() => {
          this.getArticles();
        })
        .catch(err => console.error('error with articles post', err));
    }
  };

  passArticleToEdit = articleId => this.setState({ isEditing: true, editId: articleId });

  deleteSingleArticle = (articleId) => {
    articleRequests.deleteArticle(articleId)
      .then(() => {
        this.getArticles();
      })
      .catch(err => console.error('error with delete single', err));
  }

  render() {
    const passArticleToEdit = (articleId) => {
      this.setState({ isEditing: true, editId: articleId });
    };
    const {
      articles,
      isEditing,
      editId,
    } = this.state;
    const singleArticleItem = articles.map(article => (
      <SingleArticle
        article={article}
        key={article.id}
        passArticleToEdit={passArticleToEdit}
        deleteSingleArticle={this.deleteSingleArticle}
      />
    ));
    return (
      <div className="article col">
        <h2>Article Component</h2>
        <div className="articleContainer">
          <div className="articleCards">
            {singleArticleItem}
          </div>
        </div>
        <div className="addNewArticle">
          <ArticleForm
            onSubmit={this.formSubmitArticle}
            isEditing={isEditing}
            editId={editId}
          />
        </div>
      </div>
    );
  }
}

export default Article;
