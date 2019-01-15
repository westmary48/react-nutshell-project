import React from 'react';
import 'firebase/auth';
import smashRequests from '../../../helpers/data/smashRequests';
import './Articles.scss';
import SingleArticle from './SingleArticle';
import authRequests from '../../../helpers/data/authRequests';

class Article extends React.Component {
  state = {
    articles: [],
  }

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    smashRequests.getArticlesFromMeAndFriends(uid)
      .then((data) => {
        this.setState({ articles: data });
      })
      .catch(err => console.error('err getting data', err));
  }

  render() {
    const singleArticleItem = this.state.articles.map(article => (<SingleArticle
        key={article.id}
        articleUid={article.uid}
        id={article.id}
        title={article.title}
        synopsis={article.synopsis}
        url={article.url}
    />));
    return (
        <div>
          <h2>Articles</h2>
          <div>{singleArticleItem} </div>
        </div>
    );
  }
}

export default Article;
