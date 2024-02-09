import { useStateValue } from "../StateProvider";

function SubBracelets() {
  const [{ selectedSubCategory }] = useStateValue();
  return <div>I am the SubBracelets {`${selectedSubCategory}`}</div>;
}

export default SubBracelets;
