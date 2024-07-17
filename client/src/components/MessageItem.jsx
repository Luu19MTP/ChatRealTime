const MessageItem = ({ value, username }) => {
  let name = localStorage.getItem("username");

  return (
    <>
      <div className="p-2 flex-grow-1 d-flex flex-column" style={{marginTop : 60}}>
        <div
          style={{
            color: "white",
            alignSelf: name == username ? "flex-end" : "flex-start",
            backgroundColor: name == username ? "#0d1d46" : "#6A6E7D",
            borderRadius: "10px",
            padding: "10px",
            margin: "5px",
            maxWidth: "60%",
          }}
          className="message"
        >
          {value}
        </div>
      </div>
    </>
  );
};

export default MessageItem;
