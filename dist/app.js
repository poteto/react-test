var Comment = React.createClass({displayName: 'Comment',
  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        this.props.children
      )
    )
  }
});

var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, null), 
        React.createElement(CommentForm, null)
      )
    );
  }
});

React.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);

var CommentForm = React.createClass({displayName: 'CommentForm',
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, world! I am a CommentForm."
      )
    );
  }
});

var CommentList = React.createClass({displayName: 'CommentList',
  render: function() {
    return (
      React.createElement("div", {className: "commentList"}, 
        React.createElement(Comment, {author: "Pete Hunt"}, "This is one comment"), 
        React.createElement(Comment, {author: "Jordon Walke"}, "This is *another* comment")
      )
    );
  }
});
