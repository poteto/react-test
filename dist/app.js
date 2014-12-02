var converter = new Showdown.converter();

var Comment = React.createClass({displayName: 'Comment',
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
      )
    )
  }
});

var CommentBox = React.createClass({displayName: 'CommentBox',
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

  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, null)
      )
    );
  }
});

var CommentForm = React.createClass({displayName: 'CommentForm',
  render: function() {
    return (
      React.createElement("form", {className: "commentForm"}, 
        React.createElement("input", {type: "text", placeholder: "Your name"}), 
        React.createElement("input", {type: "text", placeholder: "Say something..."}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});

var CommentList = React.createClass({displayName: 'CommentList',
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });
    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});

React.render(
  React.createElement(CommentBox, {url: "comments.json", pollInterval: 2000}),
  document.getElementById('content')
);
