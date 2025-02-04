"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";

const CreateEventPage: React.FC = () => {
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    fee: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/events", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("イベントの作成に失敗しました。");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          イベントを作成
        </h1>
        {message && <div className="text-center text-red-500">{message}</div>}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                日時
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                場所
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="fee"
                className="block text-sm font-medium text-gray-700"
              >
                参加費用
              </label>
              <input
                type="number"
                id="fee"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                イベントを作成
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-gray-900 text-white text-center p-4">
        <p>© 2023 ボードゲームマッチング</p>
      </footer>
    </div>
  );
};

export default CreateEventPage;
