/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Dropdown, Menu } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
function SortByMobileComponent() {
  const [{ user }, dispatch] = useStateValue();
  const [filter, setFilter] = useState("");
  const [clickedFilter, setClickedFilter] = useState(false);
  const handleFilter = (e) => {
    setFilter(e.key);
    // console.log("Filter: ", filter);

    // dispatch({ type: "SELECTED_FILTER_MOBILE", selectedFilterMobile: filter });
  };
  useEffect(() => {
    if (filter) {
      console.log("Filter: ", filter);
      dispatch({
        type: "SELECTED_FILTER_MOBILE",
        selectedFilterMobile: filter,
      });
    }
  }, [filter, dispatch]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(219, 114, 17)",
            colorText: "rgb(161, 90, 24);",
            colorInfoHover: "rgb(219,114,17)",
          },
        }}
      >
        <Dropdown
          overlay={
            <Menu onClick={handleFilter}>
              <Menu.Item
                key="price_asc"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <b>Price:</b> Low - High
              </Menu.Item>
              <Menu.Item
                key="price_desc"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <b>Price:</b> High - Low
              </Menu.Item>
              <Menu.Item
                key="old"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <b>Date:</b> Old - New
              </Menu.Item>
              <Menu.Item
                key="new"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <b>Date:</b> New - Old
              </Menu.Item>
            </Menu>
          }
          arrow
          placement="bottomLeft"
        >
          <Button
            style={{
              fontSize: "16px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ba704f",
              borderRadius: "5px",
              color: "#ba704f",
              fontWeight: "500",
            }}
            onClick={() => setClickedFilter(!clickedFilter)}
          >
            Sort By{" "}
            {clickedFilter ? (
              <UpOutlined style={{ fontSize: "12px" }} />
            ) : (
              <DownOutlined />
            )}
          </Button>
        </Dropdown>
      </ConfigProvider>
    </>
  );
}

export default SortByMobileComponent;
