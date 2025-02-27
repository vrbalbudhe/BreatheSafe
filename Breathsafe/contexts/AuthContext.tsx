import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { router } from "expo-router";
import axios from "axios";
import { Dimensions, Text, View } from "react-native";

// Define User Type (Modify based on actual user data structure)
interface UserType {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar?: string;
  age?: string;
  area?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

// Define AuthContext Type
interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { width } = Dimensions.get("screen");

  useEffect(() => {
    let isMounted = true;
    const checkSessions = async () => {
      await checkUserSession();
    };

    if (isMounted) {
      checkSessions();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         width: width,
  //         display: "flex",
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text style={{ fontSize: 25, fontWeight: 800 }}>Loading...</Text>
  //     </View>
  //   );
  // }

  const refreshUser = async () => {
    await checkUserSession();
  };

  const checkUserSession = async () => {
    console.log("checking user session ");
    setLoading(true);
    try {
      const res = await axios.get(
        "http://192.168.0.101:8000/api/Auth/checkLog",
        {
          withCredentials: true,
        }
      );
      console.log("Checking Log Status : ", res.data);
      if (res?.data?.payload?.email) {
        const email = res?.data?.payload?.email;
        const res1 = await axios.post(
          "http://192.168.0.101:8000/api/User/specific",
          {
            email,
          },
          {
            withCredentials: true,
          }
        );
        setUser(res1?.data?.userInfo);
        console.log("Checking Data Fetching Status : ", res1.data);
      }
    } catch (error) {
      // console.error("Error fetching user session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
