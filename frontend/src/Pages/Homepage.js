import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import ChattingPng from "../ChattingPic.png";
function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <div
      className="HomePageWrapper"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
        alignContent: "center",
        aliginItems: "center",
      }}
    >
      <div className="firstBox" style={{ width: "50%", marginTop: "7%" }}>
        <img
          className="ChattingPic"
          src={ChattingPng}
          alt="chatting png"
          style={{ width: "70%", height: "65vh", margin: "auto" }}
        />
      </div>
      <div className="secondBox" style={{ width: "50%", marginTop: "4%" }}>
        <Container maxW="xl">
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            w="100%"
            m="100px 0 15px 0"
            borderRadius="lg"
          >
            <Text
              fontSize="6xl"
              fontWeight="bold"
              color="white"
              fontFamily="Work sans"
              className="WelcomeText"
            >
              Welcome back
            </Text>
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs isFitted variant="soft-rounded">
              <TabList mb="1em">
                <Tab>Login</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Homepage;
