import React from 'react';
import 'firebase/auth';


class SingleArticle extends React.Component {
  render() {
    return (
        <div className = "article-card">
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
