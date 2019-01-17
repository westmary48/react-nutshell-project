import React from 'react';
import 'firebase/auth';
import articleRequests from '../../../../helpers/data/articleRequests';
import authRequests from '../../../../helpers/data/authRequests';


class SingleArticle extends React.Component {
    deleteEvent = (e) => {
      articleRequests.deleteArticle(this.props.id)
        .then(() => {
          this.props.printArticles();
        })
        .catch(err => console.error('error with delete', err));
    };

    editArticle = (e) => {
      e.preventDefault();
      this.props.isEditing(this.props.id);
      document.getElementById('articleName').value = this.props.title;
      document.getElementById('articleSynopsis').value = this.props.synopsis;
      document.getElementById('articleUrl').value = this.props.url;
    }

    render() {
      if (this.props.uid === authRequests.getCurrentUid()) {
        return (
          <div className="card">
            <div className="card-header">
              {this.props.title}
            </div>
            <div className="card-body">
              <p className="card-text">{this.props.synopsis}</p>
              <a href={this.props.url} className="btn btn-primary">{this.props.url}</a>
              <button type='button' className='btn btn-danger' onClick={this.deleteArticle}>Delete</button>
              <button type='button' className='btn btn-success' onClick={this.editArticle}>Edit</button>
            </div>
        </div>
        );
      }
      return (
        <div className = "card">
        <div className = "body">
          <h2>{this.props.title}</h2>
          <p>{this.props.synopsis}</p>
            <a href={this.props.url}className= "btn btn-danger">{this.props.url}</a>
        </div>
        </div>
      );
    }
}
export default SingleArticle;
