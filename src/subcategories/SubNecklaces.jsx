import { useStateValue } from "../StateProvider";
import Header from "../components/Header";

function SubNecklaces() {
  const [{ selectedSubCategory }] = useStateValue();
  console.log("The state of selectedSubCategory is: ", selectedSubCategory);
  return (
    <>
      <Header />
      <div>
        <h1>I am the sub necklaces category{`${selectedSubCategory}`}</h1>
      </div>
    </>
  );
}

export default SubNecklaces;
