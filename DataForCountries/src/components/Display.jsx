import { useState } from "react";
import ComplexView from "./ComplexView";

const Display = ({ data }) => {
  const [selectedContry, setSelectedCountry] = useState(null);
  const [displayed, setDisplayed] = useState(false);

  if (data.length == 0) {
    return <div>No results</div>;
  }
  if (data.length == 1) {
    return <ComplexView countryName={data[0].name.common}></ComplexView>;
  }
  if (data.length < 11) {
    return (
      <div>
        {data.map((el) => {
          return (
            <div key={el.name.common}>
              {el.name.common}
              <button
                onClick={() => {
                  if (selectedContry === el.name.common && displayed) {
                    setDisplayed(!displayed);
                  } else {
                    setSelectedCountry(el.name.common);
                    setDisplayed(true);
                  }
                }}
              >
                {displayed && selectedContry === el.name.common
                  ? "Hide"
                  : "Show"}
              </button>
              {selectedContry !== null &&
              selectedContry === el.name.common &&
              displayed === true ? (
                <ComplexView countryName={selectedContry}></ComplexView>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <div>Be more specific</div>
    </>
  );
};
export default Display;
