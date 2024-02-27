import { CHAT_WIDGET_URL } from "../../const/global";
import BaseLayout from "../../modules/common/layouts/BaseLayout";

const Page = () => {
  return (
    <BaseLayout>
      <div className="flex justify-center w-full h-full">
        <div className="mt-40 bg-white" style={{ width: 500, height: 600 }}>
          <iframe src={CHAT_WIDGET_URL} width="100%" height="100%" />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Page;
