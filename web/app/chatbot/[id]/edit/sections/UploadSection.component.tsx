import { memo } from "react";
import { useFilePicker } from "../../../../../hooks/useFilePicker";
import { useChatbotEditPage } from "../context";
import {
  IDataSource,
  IDataSourceType,
} from "../../../../../modules/chatbot/model/datasource/datasource.model";
import DataSourceUploadComponent from "../components/DataSourceUpload.component";
import { useChatbotPage } from "../../context";

interface IUploadSectionPropTypes {}

const UploadSection = ({}: IUploadSectionPropTypes) => {
  const { chatbot, groupedDataSources } = useChatbotPage();
  const chatbotEditPage = useChatbotEditPage();
  const filePicker = useFilePicker({
    onFilesAdd: (files: File[]) => {
      chatbotEditPage.incrementRequestCount(files.length);
    },
  });

  const handleUploadSuccess = (dataSource: IDataSource) => {
    chatbotEditPage.decrementRequestCount();
  };

  const handleUploadFAILED = () => {
    chatbotEditPage.decrementRequestCount();
  };

  if (!chatbot) return null;

  return (
    <div className="">
      {filePicker.files.map((file: File) => {
        return (
          <DataSourceUploadComponent
            onUploadSuccess={handleUploadSuccess}
            onUploadFAILED={handleUploadFAILED}
            modelPublicId={chatbot.model.publicId}
            type={IDataSourceType.Pdf}
            file={file}
            key={file.size}
          />
        );
      })}
      {groupedDataSources.pdf.map((dataSource) => (
        <div className="border-1 p-2" key={dataSource.publicId}>
          {dataSource.fileName}
        </div>
      ))}
      <div className="flex">
        {filePicker.inputComponent}
        <div className="bg-gray-50 border cursor-pointer border-dashed border-gray-300 rounded-md relative w-full">
          <div onClick={filePicker.open} className="text-center p-10 m-auto">
            <div className="flex justify-center w-full mb-4">
              <svg
                className="w-6 h-6"
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
            </div>
            <h4>
              Drop files anywhere to upload
              <br />
              or
            </h4>
            <p className="">Select Files</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(UploadSection);
