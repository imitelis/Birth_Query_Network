const UserCard = ({ userItem }) => {
  return (
    <div>
      {userItem.username} {userItem.uuid} Queries count:{" "}
      {userItem.queries.length}
    </div>
  );
};

export default UserCard;
