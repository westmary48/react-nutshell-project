import React from 'react';
import articleRequests from '../../../../helpers/data/articleRequests';
import authRequests from '../../../../helpers/data/authRequests';

class NewArticleForm extends React.Component {
    addArticles = (e) => {
      e.preventDefault();
      const newArticle = {
        title: document.getElementById('articleTitle').value,
        synopsis: document.getElementById('articleSynopsis').value,
        url: document.getElementById('articleUrl').value,
        uid: authRequests.getCurrentUid(),
      };
      articleRequests.postRequest(newArticle)
        .then(() => {
          this.props.displayArticles();
        }).catch(err => console.error('err with new article', err));
    };

    render() {
      return (
          <form className="form-name">
          <div className="form-group">
            <label htmlFor="articleName">Title</label>
            <input type="text" className="form-control" id="articleTitle" placeholder="Article Title"/>
          </div>
          <div className="form-group">
            <label htmlFor="articleSynopsis">Synopsis</label>
            <input type="text" className="form-control" id="articleSynopsis" placeholder="Synopsis"/>
          </div>
          <div className="form-group">
            <label htmlFor="articleUrl">URL</label>
            <input type="text" className="form-control" id="articleUrl" placeholder="URL"/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.addArticles}>Submit</button>
          </form>
      );
    }
}

export default NewArticleForm;
