const Total = ({ course }) => {
  const total = course.parts.reduce((sum, i) => {
    sum = sum + i.exercises;
    return sum;
  }, 0);

  return (
    <>
      <p>TOTAL OF {total} EXERCISES</p>
    </>
  );
};
export default Total;
