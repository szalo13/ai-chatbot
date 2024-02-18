import { memo, useState } from "react";
import { IDataSource } from "../../../../../modules/chatbot/model/datasource/datasource.model";
import { PrimaryButton } from "../../../../../components/layouts/MainLayoutTemplate/atoms/Button";

interface ITextDataSourcePropTypes {
  dataSource: IDataSource;
}

const TextDataSource = ({ dataSource }: ITextDataSourcePropTypes) => {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {dataSource.name}
      </h3>
      <div
        key={dataSource.publicId}
        className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
      >
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Text source
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write your content"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <PrimaryButton>Save</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default memo(TextDataSource);
