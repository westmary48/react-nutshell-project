import React from 'react';
import 'firebase/auth';
import smashRequests from '../../../../helpers/data/smashRequests';
import './Articles.scss';
import authRequests from '../../../../helpers/data/authRequests';
import SingleArticle from '../SingleArticle/SingleArticle';
import NewArticleForm from '../ArticleFrom/ArticleForm';
import articleRequests from '../../../../helpers/data/articleRequests';

class Article extends React.Component {
  state = {
    articles: [],
    isEditing: false,
    articleId: '',
  }

  refreshArticles = () => {
    smashRequests.getArticlesFromMeAndFriends(authRequests.getCurrentUid())
      .then((articlesArray) => {
        this.setState({ articles: articlesArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formTitle = () => {
    if (this.state.isEditing) {
      return 'Edit Article';
    }
    return 'Add A New Article';
  }

  editing = (currentId) => {
    if (this.state.isEditing === true) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true, articleId: currentId });
    }
  }

  printArticles = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests.getArticlesFromMeAndFriends(uid)
      .then((data) => {
        this.setState({ articles: data });
      })
      .catch(err => console.error('err getting data', err));
  }

  articleBundler = () => {
    const article = {
      title: document.getElementById('articleName').value,
      synopsis: document.getElementById('articleSynopsis').value,
      url: document.getElementById('articleUrl').value,
      uid: authRequests.getCurrentUid(),
    };
    if (this.state.isEditing) {
      articleRequests.updateArticle(this.state.articleId, article);
    } else {
      articleRequests.postRequest(article)
        .then(() => {
          this.refreshArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    this.printArticles();
  }

  render() {
    const singleArticleItem = this.state.articles.map((article) => (<SingleArticle
        key = {article.id}
        uid = {article.uid}
        id= {article.id}
        url = {article.url}
        synopsis = {article.synopsis}
        title = {article.title}
        printArticles = {this.printArticles}
        isEditing={this.isEditing}
        />));
    return (
        <div>
          <h2>Articles</h2>
          <div>{singleArticleItem} </div>
          <div className="articleForm">
          <NewArticleForm
        displayArticles={this.printArticles}
        />
        </div>
        </div>
    );
  }
}

export default Article;
