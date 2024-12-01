
import { Avatar, Button, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Chat, Logout,  Search } from "@mui/icons-material";
import { setIsDrawer, setIsPeoples } from "../../redux/slices/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/api/logoutSlice"
import { setUserData, setLoggedIn, } from "../../redux/slices/global/userSlice"
import { authenticateUser } from "../../redux/slices/api/authenticateSlice"
import { useNavigate } from "react-router-dom";


function NavDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDrawer } = useSelector(state => state.globalVar);
  const { userData } = useSelector(state => state.user)
  const logout = () => {
    dispatch(logoutUser())
      .then(response => {
        const status = response.payload
        if (status === 200) {
          dispatch(setUserData(null))
          dispatch(setLoggedIn(false))
          dispatch(authenticateUser())
          navigate('/')
        }
      })
  }
  return (
    <Drawer
      open={isDrawer}
      onClose={() => dispatch(setIsDrawer(false))}
      sx={{
        '& .MuiDrawer-paper': {
          width: "200px",
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          padding: '10px',
          background: 'transparent',
          backdropFilter: 'blur(5px)'
        },
      }}
    >
      <div className='w-full justify-center flex'>
        <Avatar sx={{ width: "70px", height: "70px" }} src={userData.avatar} />
      </div>
      <Divider />
      <div className='w-full flex justify-center h-full items-center'>
        <List>

          <ListItem button sx={{ cursor: "pointer", color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}><Chat /></ListItemIcon>
            <ListItemText primary="Chats" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem button sx={{ cursor: "pointer", color: "white" }}
            onClick={() => { dispatch(setIsPeoples(true)); dispatch(setIsDrawer(false)) }}
          >
            <ListItemIcon sx={{ color: "white" }}><Search /></ListItemIcon>
            <ListItemText primary="Search" sx={{ color: "white" }} />
          </ListItem>
        </List>
      </div>
      <div className='w-full flex justify-center mt-auto'>
        <Button startIcon={<Logout />} sx={{ textTransform: "none", color: "white", fontSize: "15px" }}
          onClick={logout}
        >Logout</Button>
      </div>
    </Drawer>
  );
}

export default NavDrawer;
