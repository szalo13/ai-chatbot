"use client";

import { Button } from "@material-tailwind/react";
import { useChatbotPage } from "../context";
import { useFilePicker } from "../../../../hooks/useFilePicker";
import DataSourceUploadComponent from "./components/DataSourceUpload.component";
import {
  IDataSource,
  IDataSourceType,
} from "../../../../modules/chatbot/model/datasource/datasource.model";

const ChatbotEditPage = () => {
  const { chatbot } = useChatbotPage();
  const filePicker = useFilePicker();

  if (!chatbot) return null;

  const handleUploadEnd = (dataSource: IDataSource) => {
    // TODO: Add logic
    console.log(dataSource);
  };

  return (
    <form>
      <h1 className="title">Edit chatbot</h1>
      <p className="description">
        Add text or pdf files and train your chatbot to answear your questions
      </p>
      <div className="flex items-center flex-row">
        {chatbot?.model.dataSourceAssets.map((asset) => (
          <div className="border-1 p-2" key={asset.publicId}>
            {asset.fileName}
          </div>
        ))}
      </div>
      {filePicker.files.map((file: File) => {
        console.log("array render");
        return (
          <DataSourceUploadComponent
            onUpload={handleUploadEnd}
            modelPublicId={chatbot.model.publicId}
            type={IDataSourceType.Pdf}
            file={file}
            key={file.size}
          />
        );
      })}
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <Button variant="filled" color="black" placeholder="Save">
            Save
          </Button>
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            {filePicker.inputComponent}
            <button
              onClick={filePicker.open}
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                />
              </svg>
              <span className="sr-only">Attach file</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatbotEditPage;
