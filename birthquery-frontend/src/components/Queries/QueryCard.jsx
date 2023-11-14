const QueryCard = ({query}) => {
    return(
      <div className="bg-slate-50 bg-opacity-60 backdrop-blur-md shadow-md p-4 rounded-lg">
        {query.name} by {query.user_username}
        created at: {query.created_at}
        {query.user_comment}
        <button className="text-md px-10 py-2 bg-teal-400 hover:bg-teal-500 text-white text-xl shadow-md rounded-md">
          Run Query
        </button>
      </div>
    )
  }

  export default QueryCard;