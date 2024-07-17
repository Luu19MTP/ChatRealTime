import "./ChatItem.css";

const ChatItem = ({ item, saveUsername, saveType }) => {
  // console.log("info_user", props);
  const handleClick = (e) => {
    saveUsername(item.name);
    saveType(item.type);
  };

  return (
    <>
      <div
        className="user__item rounded-1 p-1 d-flex gap-3 text-dark align-items-center border-bottom mt-2"
        onClick={(e) => handleClick(e)}
      >
        <div className="avatar">
          <i className="fa-solid fa-circle-user fs-1 p-0"></i>
        </div>
        <div className="info flex-grow-1">
          <span className="type">{item.type}</span>
          <div className="name">{item.name}</div>
          <div className="message">message</div>
        </div>
        <div className="time">
          <span style={{ fontSize: 12 }}>11:11</span>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
