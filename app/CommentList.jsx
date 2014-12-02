var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordon Walke">This is *another* comment</Comment>
      </div>
    );
  }
});
