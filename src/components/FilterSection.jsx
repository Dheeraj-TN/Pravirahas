/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FilterSection.css";
import { AlignLeftOutlined } from "@ant-design/icons";
function FilterSection() {
  const [priceRange, setPriceRange] = useState("");

  const handleChange = (e) => {
    setPriceRange(e.target.value);
  };
  return (
    <div className="filter__section">
      <div className="filter__heading">
        <h2>
          Filters <AlignLeftOutlined />
        </h2>
        <h2>Clear All</h2>
      </div>
      <div className="filter__price">
        <h3 className="filter__title">Filter by Price</h3>
        <select
          value={priceRange}
          onChange={handleChange}
          className="dropdown__ranges"
        >
          <option value="">Select a price range</option>
          <option value="under500">Under ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-3000">₹2000 - ₹3000</option>
          <option value="3000-4000">₹3000 - ₹4000</option>
          <option value="4000-5000">₹4000 - ₹5000</option>
          <option value="5000+">₹5000 and above</option>
        </select>
        <select
          value={priceRange}
          onChange={handleChange}
          className="dropdown__ranges"
        >
          <option value="">Select a price range</option>
          <option value="under500">Under ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-3000">₹2000 - ₹3000</option>
          <option value="3000-4000">₹3000 - ₹4000</option>
          <option value="4000-5000">₹4000 - ₹5000</option>
          <option value="5000+">₹5000 and above</option>
        </select>
        <select
          value={priceRange}
          onChange={handleChange}
          className="dropdown__ranges"
        >
          <option value="">Select a price range</option>
          <option value="under500">Under ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-3000">₹2000 - ₹3000</option>
          <option value="3000-4000">₹3000 - ₹4000</option>
          <option value="4000-5000">₹4000 - ₹5000</option>
          <option value="5000+">₹5000 and above</option>
        </select>
        <select
          value={priceRange}
          onChange={handleChange}
          className="dropdown__ranges"
        >
          <option value="">Select a price range</option>
          <option value="under500">Under ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-3000">₹2000 - ₹3000</option>
          <option value="3000-4000">₹3000 - ₹4000</option>
          <option value="4000-5000">₹4000 - ₹5000</option>
          <option value="5000+">₹5000 and above</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSection;
