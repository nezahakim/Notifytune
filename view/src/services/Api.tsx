import axios from "axios";
import { Navigate } from "react-router-dom";

const API_BASE_URL = 'https://reimagined-eureka-r4g64xprrrrpf4g6-3000.app.github.dev/api'
// const API_BASE_URL = "http://localhost:3000/api";

class Api {
  axios: any;
  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
    });

    this.axios.interceptors.request.use((config: { headers: { [x: string]: string; Authorization: string; }; }) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["x-auth-token"] = token;
      }

      return config;
    });

    this.axios.interceptors.response.use(
      (response: any) => response,
      (error: { response: { status: number; }; }) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          // const navigate = useNavigate();
          // navigate("/login");
          // Optionally, redirect to login page or dispatch a logout action
        }
        return Promise.reject(error);
      },
    );
  }

  // User routes
  async register(userData: any) {
    const response = await this.axios.post("/auth/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user.userId);
    }
    return response.data;
  }

  async login(credentials: any) {
    const response = await this.axios.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user.userId);
      console.log('success')
    }
    return response.data;
  }

  async getUserProfile(username: any) {
    let endpoint;
    if (!username) {
      endpoint = `/users/uname`;
    } else {
      endpoint = `/users/uname/${username}`;
    }

    try {
      const response = await this.axios.get(endpoint, {
        params: {
          userId: localStorage.getItem("user_id"),
        },
      });

      if (response.data.message == "Token is not valid") {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async getUserByUserId(user_id: any) {
    try {
      const response = await this.axios.get(`/users/id/` + user_id, {
        params: {
          userId: localStorage.getItem("user_id"),
        },
      });

      if (response.data.message == "Token is not valid") {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async updateUserProfile(userData: any) {
    // const userId = localStorage.getItem("user_id");
    const response = await this.axios.get(`/users/update`, userData);
    return response.data;
  }

  async getChats(userId: any){
    const response = await this.axios.get(`/chats/getChats/`+userId);
    return response.data;
  }


  async checkChat(chatId: any, userId:any){
    const response = await this.axios.post(`/chats/checkChat`, {chatId, userId});
    return response.data;
  }

  async getChatIdWithCheck(userId:any, currentUserId:any){
    const response = await this.axios.post(`/chats/getChatIdWithCheck`, {userId: userId, currentUserId: currentUserId} );
    return response.data;
  }

  async chatMessages(chatId: any){
    console.log(chatId)
    const response = await this.axios.get(`/chats/chatMessages/`+chatId);
    return response.data;
  }


  async createChat(type: any, participants:any){
    const response = await this.axios.post(`/chats/createChat`, {type,participants});
    return response.data;
  }

  async sendText(chatId: any, userId: any, text: any){
    const response = await this.axios.post(`/chats/sendText`, {chatId, userId, text});
    return response.data;
  }

}

export default new Api();
