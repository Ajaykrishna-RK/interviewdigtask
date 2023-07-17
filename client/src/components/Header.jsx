import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { clearState, setLogout, setSearched } from "../redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../baseUrl";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const { searchPost, userData, token } = useSelector((state) => state.Userss);
  console.log(searchPost, "k");

  const SearchResults = async () => {
    try {
      const response = await fetch(BASEURL + `users/search/${search}`, {
        method: "GET",
      });
      const data = await response.json();
      setSearchOn(true);
      dispatch(
        setSearched({
          searchPost: data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    SearchResults();
  };

  const handleFunction = (id) => {
    navigate(`/single/${id}`);
    setSearchOn(false);
  };

const handleLogout = ()=>{
  dispatch(setLogout())
  navigate("/auth")
}

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div>
            <Typography variant="h6" component="div" sx={{color:"black" }}>
        Users CRUD
          </Typography>
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
             


              <form>
                <TextField
                  label="search"
                  value={search}
                  onChange={(e) => handleSearch(e)}
                  color="success"
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: "10px", marginLeft: "5px" }}
                  onClick={SearchResults}
                >
                  Search
                </Button>
              </form>
            </div>

            <div>
              {token ? (
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => dispatch(setLogout())}
                >
                  LogOut
                </Button>
              ) : (
                <Button
                variant="contained"
                disableElevation
                onClick={handleLogout}
              >
               register / Login
              </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {searchOn && searchPost.length !== 0 && (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Card sx={{ width: "50%" }}>
            <p
              onClick={() => setSearchOn(false)}
              style={{ marginLeft: "10px", cursor: "pointer", color: "blue" }}
            >
              back
            </p>
            <CardContent>
              <div>
                {searchPost.map((item) => (
                  <>
                    <p
                      style={{
                        color: "black",
                        cursor: "pointer",
                        fontSize: "20px",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleFunction(item._id)}
                    >
                      {item.name}
                    </p>
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default Header;
