function Filter({ filter, handleFilterChange }) {
  return (
    <div>
      FILTER: show with name{" "}
      <input value={filter} onChange={handleFilterChange}></input>
    </div>
  );
}
export default Filter;
