import React from 'react';
import 'firebase/auth';
import smashRequests from '../../../../helpers/data/smashRequests';
import './Articles.scss';
import authRequests from '../../../../helpers/data/authRequests';
import SingleArticle from '../SingleArticle/SingleArticle';
import NewArticleForm from '../ArticleFrom/ArticleForm';

class Article extends React.Component {
  state = {
    articles: [],
  }

  printArticles = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests.getArticlesFromMeAndFriends(uid)
      .then((data) => {
        this.setState({ articles: data });
      })
      .catch(err => console.error('err getting data', err));
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
