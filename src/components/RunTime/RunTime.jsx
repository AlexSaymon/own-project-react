const RunTime = ({ movieTime }) => {
  if (!movieTime) return <div>-- -- --</div>;

  const hours = Math.floor(movieTime / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (movieTime % 60).toString().padStart(2, "0");
  const filmTime = `${hours}:${minutes}:00`;

  return <div>{filmTime}</div>;
};

export default RunTime;
