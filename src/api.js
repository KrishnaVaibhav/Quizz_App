// src/api.js
import axios from "axios";

const API_BASE_URL =
  "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev";

export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quizzes`, quizData);
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (quizID) => {
  return axios.delete(`${API_BASE_URL}/quizzes/${quizID}`);
};

export const fetchQuiz = async (quizID) => {
  return axios.get(`${API_BASE_URL}/quizzes/${quizID}`);
};

export const submitQuiz = async (responseData) => {
  return axios.post(`${API_BASE_URL}/responses`, responseData);
};

export const getResults = async (responseID) => {
  return axios.get(`${API_BASE_URL}/responses/${responseID}`);
};
