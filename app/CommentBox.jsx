var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url      : this.props.url,
      dataType : 'json',

      success: function(data) {
        this.setState({ data: data });
      }.bind(this),

      error: function(xhr, status, error) {
        console.error(this.props.url, status, error.toString());
      }
    });
  },

  handleCommentSubmit: function(comment) {
    this._addComment(comment);
    $.ajax({
      url      : this.props.url,
      dataType : 'json',
      type     : 'POST',
      data     : comment,

      success: function(data) {
        this.setState({ data: data });
      }.bind(this),

      error: function(xhr, status, error) {
        console.error(this.props.url, status, error.toString());
      }
    });
  },

  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  },

  _addComment: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({
      data: newComments
    });
  }
});
