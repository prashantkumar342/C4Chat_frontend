import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Divider,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatBoxData,
  setSelectedRecipientId,
  setMessages,
  setRecipient,
} from "../../redux/slices/global/globalSlice";
import { fetchUsers } from "../../redux/slices/api/fetchUsersSlice";
import { setUsers } from "../../redux/slices/api/fetchUsersSlice";
import ListLoader from "../Loaders/ListLoader";
import { fetchRecipient } from "../../redux/slices/api/recipientSlice";
import { useNavigate } from "react-router-dom";

function Peoples() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchLoading, users, error } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchUsers(searchQuery));
    }
  }, [searchQuery, dispatch]);

  const clearSearch = () => {
    setSearchQuery("");
  };

    const getRecipient = async (recipientId) => {
      dispatch(setMessages([]));
      await dispatch(setSelectedRecipientId(recipientId));
      dispatch(fetchRecipient(recipientId)).then((response) => {
        const user = response.payload;
        dispatch(
          setChatBoxData({
            username: user.username,
            status: user.status,
            avatar: user.avatar,
            id: user._id,
          })
        );
        dispatch(setRecipient(user));
        navigate(`/dashboard/chat/user`);
      });
    };

  return (
    <div className="flex flex-col h-full max-sm:w-screen overflow-y-auto">
      <Box sx={{ px: 1, pb: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Find Peoples"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    clearSearch();
                    dispatch(setUsers([]));
                  }}
                >
                  <CloseIcon sx={{ color: "#6E00FF" }} />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              borderRadius: "15px",
              paddingRight: "10px",
            },
          }}
        />
      </Box>
      {error && <p>Error: {error}</p>}
      <div className="overflow-y-auto h-full px-2">
        {fetchLoading ? (
          <ListLoader />
        ) : (
          <List>
            {users.map((user, index) => (
              <div key={user._id}>
                <ListItem
                  component={Button}
                  sx={{
                    textTransform: "none",
                    color: "black",
                    outline: "none",
                    borderRadius: "0px",
                    margin: "0px",
                    position: "relative",
                  }}
                  onClick={() => {
      
                    getRecipient(user._id);
                    dispatch(setUsers([]));
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={user.avatar}
                      sx={{
                        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: "bold",
                        color: "black",
                      },
                      "& .MuiListItemText-secondary": {
                        color: "black",
                      },
                    }}
                  />
                </ListItem>
                {index < users.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        )}
      </div>
    </div>
  );
}

export default Peoples;
