import React from 'react';
import 'firebase/auth';
import articleRequests from '../../../../helpers/data/articleRequests';
import authRequests from '../../../../helpers/data/authRequests';


class SingleArticle extends React.Component {
  render() {
    const articleUid = authRequests.getCurrentUid();
    const deleteEvent = (e) => {
      articleRequests.deleteArticle(this.props.id)
        .then(() => {
          this.props.updateArticles();
        })
        .catch(err => console.error('error with delete', err));
    };

    const deleteButton = () => {
      if (this.props.uid === articleUid) {
        return (
          <div>
          <button className="btn btn-primary" onClick={deleteEvent}>Delete</button>
        </div>
        );
      }
    };
    return (
        <div className = "card">
        <div className = "body">
          <h2>{this.props.title}</h2>
          <p>{this.props.synopsis}</p>
            <a href={this.props.url}className= "btn btn-danger">{this.props.url}</a>
            { deleteButton() }
        </div>
        </div>
    );
  }
}
export default SingleArticle;
